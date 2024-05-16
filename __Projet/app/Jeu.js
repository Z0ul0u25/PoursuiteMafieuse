define(["require", "exports", "./Rue", "./Menu", "./Boss", "./Maki", "./Wasabi", "./Ricardo", "./Missile", "./Explosion", "./AfficheurVie", "./AfficheurPts", "./ObjetVisible"], function (require, exports, Rue_1, Menu_1, Boss_1, Maki_1, Wasabi_1, Ricardo_1, Missile_1, Explosion_1, AfficheurVie_1, AfficheurPts_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jeu = void 0;
    var Jeu = /** @class */ (function () {
        function Jeu(refScene) {
            this.refScene = null;
            this.rue = null;
            this.menu = null;
            this.afficheurVie = null;
            this.afficheurPts = null;
            this.ricardo = null;
            this.tAntagoniste = [];
            this.tDynamite = [];
            this.missile = null;
            this.tminDynamite = [];
            this.musique = null;
            this._gestionMissile = this.gestionMissile.bind(this);
            ObjetVisible_1.ObjetVisible.refJeu = this;
            this.refScene = refScene;
            this.afficherMenu();
        }
        Jeu.prototype.debuter = function () {
            createjs.Sound.stop();
            if (this.rue != null) {
                this.rue.destructeur();
                this.ricardo.destructeur();
                this.afficheurVie.destructeur();
                this.afficheurPts.destructeur();
                this.tAntagoniste.forEach(function (antagoniste) {
                    antagoniste.destructeur();
                });
            }
            this.rue = new Rue_1.Rue();
            this.afficheurVie = new AfficheurVie_1.AfficheurVie();
            this.ricardo = new Ricardo_1.Ricardo(window.lib.properties.width / 2, window.lib.properties.height - 128, this.afficheurVie);
            this.tAntagoniste.push(new Maki_1.Maki(window.lib.properties.width * 0.35, 150));
            this.tAntagoniste.push(new Wasabi_1.Wasabi(window.lib.properties.width * 0.65, 150));
            for (var i = 0; i < this.tAntagoniste.length; i++) {
                this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 1000 + i * 200, this.tAntagoniste[i]));
            }
            this.afficheurPts = new AfficheurPts_1.AfficheurPts();
            this.refScene.addChild(this.afficheurPts);
            this.musique = createjs.Sound.play("musique_n1", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
        };
        Jeu.prototype.chargementNiveau2 = function () {
            createjs.Sound.stop();
            this.musique = createjs.Sound.play("musique_n2_in", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.5 });
            this.musique.on("complete", this.debuterNiveau2.bind(this));
        };
        Jeu.prototype.debuterNiveau2 = function () {
            this.musique = createjs.Sound.play("musique_n2_loop", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            this.tAntagoniste.push(new Boss_1.Boss(window.lib.properties.width / 2, -150, this.ricardo));
            this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], -20));
            this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], 20));
        };
        Jeu.prototype.afficherMenu = function (etat) {
            if (etat === void 0) { etat = ""; }
            if (this.menu == null) {
                this.menu = new Menu_1.Menu();
            }
            else {
                this.refScene.swapChildren(this.menu, this.refScene.children[this.refScene.children.length - 2]);
                this.refScene.swapChildren(this.menu.getRefBouton(), this.refScene.children[this.refScene.children.length - 1]);
                this.menu.setVisibilite(true);
                this.menu.gotoAndStop(etat);
            }
        };
        Jeu.prototype.gestionDynamite = function (antagoniste, deltaX, deltaY) {
            var _this = this;
            if (deltaX === void 0) { deltaX = 0; }
            if (deltaY === void 0) { deltaY = 0; }
            if (this.refScene.tickEnabled) {
                // Ajout de la dynamite
                this.tDynamite.push(antagoniste.lanceDynamite(deltaX, deltaY));
                var nouvelleDynamite = this.tDynamite[this.tDynamite.length - 1];
                // Place les afficheurs devant la dynamite
                this.refScene.swapChildren(nouvelleDynamite, this.afficheurVie);
                this.refScene.swapChildren(nouvelleDynamite, this.afficheurPts);
                this.refScene.swapChildren(nouvelleDynamite, antagoniste);
                // Suppression de dynamite hors vu
                this.tDynamite.forEach(function (dynamite) {
                    if (dynamite.y > window.lib.properties.height + 100) {
                        _this.detruireDynamite(dynamite, false);
                    }
                });
            }
        };
        Jeu.prototype.detruireDynamite = function (dynamite, touche) {
            if (touche) {
                this.afficheurPts.majPointage(-100);
            }
            dynamite.destructeur();
            this.tDynamite.splice(this.tDynamite.indexOf(dynamite), 1);
        };
        Jeu.prototype.gestionMissile = function (posX, posY) {
            var _this = this;
            if (posX === void 0) { posX = -1; }
            if (posY === void 0) { posY = -1; }
            if (posX != -1) {
                if (this.missile == null) {
                    this.missile = new Missile_1.Missile(this.ricardo.x + 12, this.ricardo.y - 83, this.ricardo.rotation);
                    this.refScene.addEventListener("tick", this._gestionMissile, false);
                }
                else {
                    var touche_1 = false;
                    this.tAntagoniste.forEach(function (antagoniste) {
                        var point = _this.missile.parent.localToLocal(_this.missile.x, _this.missile.y, antagoniste);
                        if (antagoniste.hitTest(point.x, point.y)) {
                            new Explosion_1.Explosion(_this.missile.x, _this.missile.y);
                            antagoniste.jmeSuisFaitToucherPisCaFaitMal(1);
                            touche_1 = true;
                        }
                    });
                    if (touche_1 || this.missile.y < -100) {
                        this.afficheurPts.majPointage((touche_1 ? 1000 : -100));
                        this.refScene.removeEventListener("tick", this._gestionMissile);
                        this.missile.destructeur();
                        this.missile = null;
                    }
                }
            }
            return this.missile == null;
        };
        Jeu.prototype.finDuJeu = function () {
            for (var i = 0; i < this.tminDynamite.length; i++) {
                clearInterval(this.tminDynamite[i]);
            }
            this.rue.arreterDefilement();
            for (var i = 0; i < this.tAntagoniste.length; i++) {
                this.tAntagoniste[i].departDeFin();
            }
        };
        Jeu.prototype.detruireAntagoniste = function (unAntagoniste) {
            var isBoss = unAntagoniste.name == "Boss";
            if (!isBoss) {
                clearInterval(this.tminDynamite[this.tAntagoniste.indexOf(unAntagoniste)]);
                this.tminDynamite.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);
            }
            else {
                for (var i = 0; i < this.tminDynamite.length; i++) {
                    clearInterval(this.tminDynamite[i]);
                }
                this.tminDynamite = [];
                if (this.ricardo.getVie() > 0) {
                    this.afficherMenu("gagne");
                }
            }
            this.tAntagoniste.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);
            unAntagoniste.destructeur();
            if (!isBoss && this.tAntagoniste.length == 0 && this.ricardo.getVie() > 0) {
                this.chargementNiveau2();
            }
        };
        Jeu.prototype.getDynamites = function () {
            return this.tDynamite;
        };
        Jeu.prototype.getScene = function () {
            return this.refScene;
        };
        return Jeu;
    }());
    exports.Jeu = Jeu;
});
//# sourceMappingURL=Jeu.js.map