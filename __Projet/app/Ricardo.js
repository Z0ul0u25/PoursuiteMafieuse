var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Explosion", "./ObjetVisible", "./Voiture"], function (require, exports, Explosion_1, ObjetVisible_1, Voiture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ricardo = void 0;
    /**
     * @class Ricardo
     * @description Personnage qui est controlé par le joueur
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Ricardo = /** @class */ (function (_super) {
        __extends(Ricardo, _super);
        /**
         * Constructeur de Ricardo
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         * @param refAfficheurVie Référence à l'objet AfficheurVie
         */
        function Ricardo(posX, posY, refAfficheurVie) {
            var _this = _super.call(this, posX, posY) || this;
            _this.refAfficheurVie = null;
            _this.minuterieBouger = null;
            _this.touchesEnfoncees = null;
            _this.timeoutMissile = null;
            /*
            [0] = haut
            [1] = droite
            [2] = bas
            [3] = gauche
            */
            //Binding
            _this._activerTouche = _this.activerTouche.bind(_this);
            _this._desactiverTouche = _this.desactiverTouche.bind(_this);
            _this._faireBouger = _this.faireBouger.bind(_this);
            _this.refAfficheurVie = refAfficheurVie;
            _this.name = "Ricardo";
            _this.pointVie = 4;
            _this.accelDelta = 0.4;
            _this.vitesseMax = 5;
            _this.rotationRatio = 3;
            // [Haut, Droite, Bas, Gauche]
            _this.zoneLimite = [window.lib.properties.height / 2, window.lib.properties.width - 32, window.lib.properties.height - 128, 32];
            // [W, D, S, A] (Haut, Droite, Bas, Gauche)
            _this.touchesEnfoncees = [false, false, false, false];
            // Évenement au clavier
            window.onkeydown = _this._activerTouche;
            window.onkeyup = _this._desactiverTouche;
            _this.addEventListener("tick", _this.collisionDynamite.bind(_this, ObjetVisible_1.ObjetVisible.refJeu.getDynamites()), false);
            return _this;
        }
        /**
         * Sera redéfini dans toutes les sous classes selon le Clip
         */
        Ricardo.prototype.dessiner = function () {
            window.lib.ClipRicardo.call(this);
            this.frameBounds = window.lib.ClipRicardo.prototype.frameBounds;
        };
        /**
         * Gère les actions à faire sur activation d'une touche
         * @param e KeyboardEvent pour bouger et tirer
         */
        Ricardo.prototype.activerTouche = function (e) {
            // Retrait en avance de toute frape au clavier pour ne pas
            // accidentellement faire une action qui sortirait du jeu
            e.preventDefault();
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    // Vers le haut
                    this.touchesEnfoncees[0] = true;
                    break;
                case "ArrowRight":
                case "d":
                    // Vers la droite
                    this.touchesEnfoncees[1] = true;
                    break;
                case "ArrowDown":
                case "s":
                    // Vers le bas
                    this.touchesEnfoncees[2] = true;
                    break;
                case "ArrowLeft":
                case "a":
                    // Vers la gauche
                    this.touchesEnfoncees[3] = true;
                    break;
                case " ":
                    /**
                     * Lancement de missile si:
                     * - Le timout de rechargement est passé
                     * - il n'y a pas de missile sur la scène
                     */
                    if (this.timeoutMissile == null && ObjetVisible_1.ObjetVisible.refJeu.gestionMissile()) {
                        this.gotoAndPlay("tir");
                        this.timeoutMissile = setTimeout(this.apparitionMissile.bind(this), 1000 / 30 * 24);
                    }
                    break;
                // Aucune raison de faire un default
            }
            // gestion du mouvement 120 fois par seconde pour plus de précision.
            if (this.minuterieBouger == null) {
                this.minuterieBouger = window.setInterval(this._faireBouger, 1000 / 120);
            }
        };
        /**
         * Gère les actions à faire au relachement d'une touche
         * @param e KeyboardEvent pour bouger
         */
        Ricardo.prototype.desactiverTouche = function (e) {
            e.preventDefault();
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    this.touchesEnfoncees[0] = false;
                    break;
                case "ArrowRight":
                case "d":
                    this.touchesEnfoncees[1] = false;
                    break;
                case "ArrowDown":
                case "s":
                    this.touchesEnfoncees[2] = false;
                    break;
                case "ArrowLeft":
                case "a":
                    this.touchesEnfoncees[3] = false;
                    break;
                case "p": //Debug Key
                    // Écrire les console log ici
                    break;
                default:
                    break;
            }
        };
        /**
         * Gère le mouvement du personnage principal
         */
        Ricardo.prototype.faireBouger = function () {
            // Se rappeler qu'une vitesse négative veut dire que l'on vas dans la direction opposé
            // Test vitesse en Y
            // Si l'on appuis sur (W, arrowUP) ou (S, arrowDown) de façon exclusive (Pas les deux en même temps)
            // && que la vitesse maximal n'est pas atteinte
            if ((this.touchesEnfoncees[0] != this.touchesEnfoncees[2]) && (Math.abs(this.vitesseY) < this.vitesseMax)) {
                // Vitesse augmente si on Appui sur "W", sinon vitesse diminue car "S"
                this.vitesseY += this.accelDelta * (this.touchesEnfoncees[2] ? 1 : -1);
            }
            else if (Math.abs(this.vitesseY) > this.accelDelta) {
                // Si on appuis sur aucune des deux touches la vitesse revient à 0
                this.vitesseY -= this.accelDelta * Math.sign(this.vitesseY);
            }
            // Test vitesse en X
            // Si l'on appuis sur (A, arrowLeft) ou (D, arrowRight) de façon exclusive (Pas les deux en même temps)
            // && que la vitesse maximal n'est pas atteinte
            if ((this.touchesEnfoncees[1] != this.touchesEnfoncees[3]) && (Math.abs(this.vitesseX) < this.vitesseMax)) {
                // Vitesse augmente si on Appui sur "D", sinon vitesse diminue car "A"
                this.vitesseX += this.accelDelta * (this.touchesEnfoncees[1] ? 1 : -1);
            }
            else if (Math.abs(this.vitesseX) > this.accelDelta) {
                // Si on appuis sur aucune des deux touches la vitesse revient à 0
                this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
            }
            // Changement dans la position Y si on est dan les limites
            if ((this.y + this.vitesseY > this.zoneLimite[0]) && (this.y + this.vitesseY < this.zoneLimite[2])) {
                this.y += this.vitesseY;
            }
            else {
                this.vitesseY = 0;
            }
            // Changement dans la position X si on est dan les limites
            if (this.x + this.vitesseX < this.zoneLimite[1] && this.x + this.vitesseX > this.zoneLimite[3]) {
                this.x += this.vitesseX;
            }
            else {
                this.vitesseX = 0;
            }
            // Rotation selon la vitesse en X
            this.rotation = this.vitesseX * this.rotationRatio;
            // Si la vitesse tombe en dessous du Delta d'acceleration
            if (Math.abs(this.vitesseX) < this.accelDelta && Math.abs(this.vitesseY) < this.accelDelta) {
                // Vérification si aucune touche n'est enfoncé
                var auMoinsUneToucheEnfoncee = false;
                for (var _i = 0, _a = this.touchesEnfoncees; _i < _a.length; _i++) {
                    var estDown = _a[_i];
                    if (estDown) {
                        auMoinsUneToucheEnfoncee = true;
                    }
                }
                // Clear l'interval seulement si aucune touche est enfoncé
                if (!auMoinsUneToucheEnfoncee) {
                    window.clearInterval(this.minuterieBouger);
                    this.minuterieBouger = null;
                }
            }
        };
        /**
         * Gère ce equi à as faire lors de l'apparition d'un missile
         */
        Ricardo.prototype.apparitionMissile = function () {
            ObjetVisible_1.ObjetVisible.refJeu.gestionMissile(this.x, this.y);
            createjs.Sound.play("missile" + Math.round(Math.random()));
            clearTimeout(this.timeoutMissile);
            this.timeoutMissile = null;
        };
        /**
         * Vérifie s'il y a collision avec une dynamite
         * @param tDynamite Array de Dynamite
         */
        Ricardo.prototype.collisionDynamite = function (tDynamite) {
            var _this = this;
            tDynamite.forEach(function (dynamite) {
                var point = dynamite.parent.localToLocal(dynamite.x, dynamite.y, _this);
                if (_this.hitTest(point.x, point.y)) {
                    new Explosion_1.Explosion(dynamite.x, dynamite.y, true);
                    _this.jmeSuisFaitToucherPisCaFaitMal(1);
                    dynamite.y = 1000;
                    ObjetVisible_1.ObjetVisible.refJeu.detruireDynamite(dynamite, true);
                }
            });
        };
        /**
         * Retrait de point de vie spécialement pour Ricardo
         * @param degreDeViolenceRecu point de domage
         */
        Ricardo.prototype.jmeSuisFaitToucherPisCaFaitMal = function (degreDeViolenceRecu) {
            _super.prototype.jmeSuisFaitToucherPisCaFaitMal.call(this, degreDeViolenceRecu);
            this.refAfficheurVie.maj(this.pointVie);
            if (this.pointVie <= 0) {
                ObjetVisible_1.ObjetVisible.refJeu.finDuJeuPerdu();
                this.removeAllEventListeners();
                window.onkeydown = null;
                window.onkeyup = null;
                clearInterval(this.minuterieBouger);
                this.minuterieBouger = null;
            }
        };
        /**
         * Obtenir la position
         * @returns Point de possition
         */
        Ricardo.prototype.getPos = function () {
            return new createjs.Point(this.x, this.y);
        };
        /**
         * Obtenir la quantité de vie
         * @returns nombre de point de vie
         */
        Ricardo.prototype.getVie = function () {
            return this.pointVie;
        };
        /**
         * Destructeur
         */
        Ricardo.prototype.destructeur = function () {
            this._faireBouger = null;
            this._desactiverTouche = null;
            this._activerTouche = null;
            if (this.minuterieBouger != null) {
                window.clearInterval(this.minuterieBouger);
                this.minuterieBouger = null;
            }
            this.touchesEnfoncees = null;
            this.refAfficheurVie = null;
            this.timeoutMissile = null;
            window.onkeydown = null;
            window.onkeyup = null;
            _super.prototype.destructeur.call(this);
        };
        return Ricardo;
    }(Voiture_1.Voiture));
    exports.Ricardo = Ricardo;
});
//# sourceMappingURL=Ricardo.js.map