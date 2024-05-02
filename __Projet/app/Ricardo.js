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
define(["require", "exports", "./Explosion", "./Voiture"], function (require, exports, Explosion_1, Voiture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ricardo = void 0;
    var Ricardo = /** @class */ (function (_super) {
        __extends(Ricardo, _super);
        function Ricardo(refScene, refJeu, posX, posY, refAfficheurVie) {
            var _this = _super.call(this, refScene, posX, posY) || this;
            _this.refScene = null;
            _this.refJeu = null;
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
            _this.refScene = refScene;
            _this.refJeu = refJeu;
            _this.refAfficheurVie = refAfficheurVie;
            _this.name = "Ricardo";
            _this.pointVie = 4;
            _this.accelDelta = 0.4;
            _this.vitesseMax = 5;
            _this.rotationRatio = 3;
            // Haut, Droite, Bas, Gauche
            _this.zoneLimite = [window.lib.properties.height / 2, window.lib.properties.width - 32, window.lib.properties.height - 128, 32];
            _this.touchesEnfoncees = [false, false, false, false];
            window.onkeydown = _this._activerTouche;
            window.onkeyup = _this._desactiverTouche;
            _this.addEventListener("tick", _this.collisionDynamite.bind(_this, _this.refJeu.getDynamites()), false);
            return _this;
        }
        Ricardo.prototype.dessiner = function () {
            window.lib.ClipRicardo.call(this);
            this.frameBounds = window.lib.ClipRicardo.prototype.frameBounds;
        };
        Ricardo.prototype.activerTouche = function (e) {
            e.preventDefault();
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    this.touchesEnfoncees[0] = true;
                    break;
                case "ArrowRight":
                case "d":
                    this.touchesEnfoncees[1] = true;
                    break;
                case "ArrowDown":
                case "s":
                    this.touchesEnfoncees[2] = true;
                    break;
                case "ArrowLeft":
                case "a":
                    this.touchesEnfoncees[3] = true;
                    break;
                case " ":
                    if (this.timeoutMissile == null && this.refJeu.gestionMissile()) {
                        this.gotoAndPlay("tir");
                        this.timeoutMissile = setTimeout(this.apparitionMissile.bind(this), 1000 / 30 * 24);
                    }
                    break;
                // Aucune raison de faire un default
            }
            if (this.minuterieBouger == null) {
                this.minuterieBouger = window.setInterval(this._faireBouger, 1000 / 120);
            }
        };
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
                    console.log("DEBUG STATUS \n======");
                    this.gotoAndPlay("mort");
                    break;
                default:
                    break;
            }
        };
        Ricardo.prototype.faireBouger = function () {
            if ((this.touchesEnfoncees[0] != this.touchesEnfoncees[2]) && (Math.abs(this.vitesseY) < this.vitesseMax)) {
                this.vitesseY += this.accelDelta * (this.touchesEnfoncees[2] ? 1 : -1);
            }
            else if (Math.abs(this.vitesseY) > this.accelDelta) {
                this.vitesseY -= this.accelDelta * Math.sign(this.vitesseY);
            }
            if ((this.touchesEnfoncees[1] != this.touchesEnfoncees[3]) && (Math.abs(this.vitesseX) < this.vitesseMax)) {
                this.vitesseX += this.accelDelta * (this.touchesEnfoncees[1] ? 1 : -1);
            }
            else if (Math.abs(this.vitesseX) > this.accelDelta) {
                this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
            }
            if ((this.y + this.vitesseY > this.zoneLimite[0]) && (this.y + this.vitesseY < this.zoneLimite[2])) {
                this.y += this.vitesseY;
            }
            else {
                this.vitesseY = 0;
            }
            if (this.x + this.vitesseX < this.zoneLimite[1] && this.x + this.vitesseX > this.zoneLimite[3]) {
                this.x += this.vitesseX;
            }
            else {
                this.vitesseX = 0;
            }
            this.rotation = this.vitesseX * this.rotationRatio;
            if (Math.abs(this.vitesseX) < this.accelDelta && Math.abs(this.vitesseY) < this.accelDelta) {
                var auMoinsUneToucheEnfoncee = false;
                for (var _i = 0, _a = this.touchesEnfoncees; _i < _a.length; _i++) {
                    var estDown = _a[_i];
                    if (estDown) {
                        auMoinsUneToucheEnfoncee = true;
                    }
                }
                if (!auMoinsUneToucheEnfoncee) {
                    window.clearInterval(this.minuterieBouger);
                    this.minuterieBouger = null;
                }
            }
        };
        Ricardo.prototype.apparitionMissile = function () {
            this.refJeu.gestionMissile(this.x, this.y);
            clearTimeout(this.timeoutMissile);
            this.timeoutMissile = null;
        };
        Ricardo.prototype.collisionDynamite = function (tDynamite) {
            var _this = this;
            tDynamite.forEach(function (dynamite) {
                var point = dynamite.parent.localToLocal(dynamite.x, dynamite.y, _this);
                if (_this.hitTest(point.x, point.y)) {
                    new Explosion_1.Explosion(_this.refScene, dynamite.x, dynamite.y);
                    _this.jmeSuisFaitToucherPisCaFaitMal(1);
                    dynamite.y = 1000;
                }
            });
        };
        Ricardo.prototype.jmeSuisFaitToucherPisCaFaitMal = function (degreDeViolenceRecu) {
            _super.prototype.jmeSuisFaitToucherPisCaFaitMal.call(this, degreDeViolenceRecu);
            this.refAfficheurVie.maj(this.pointVie);
            if (this.pointVie <= 0) {
                this.refJeu.finDuJeu();
                this.removeAllEventListeners();
                window.onkeydown = null;
                window.onkeyup = null;
                clearInterval(this.minuterieBouger);
                this.minuterieBouger = null;
            }
        };
        Ricardo.prototype.detruire = function () {
            this._faireBouger = null;
            this._desactiverTouche = null;
            this._activerTouche = null;
            if (this.minuterieBouger != null) {
                window.clearInterval(this.minuterieBouger);
                this.minuterieBouger = null;
            }
            this.touchesEnfoncees = null;
            window.onkeydown = null;
            window.onkeyup = null;
            _super.prototype.detruire.call(this);
        };
        return Ricardo;
    }(Voiture_1.Voiture));
    exports.Ricardo = Ricardo;
});
//# sourceMappingURL=Ricardo.js.map