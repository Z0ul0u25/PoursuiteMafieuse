define(["require", "exports", "./Rue", "./Ricardo", "./Maki", "./Wasabi", "./Menu", "./Bouton"], function (require, exports, Rue_1, Ricardo_1, Maki_1, Wasabi_1, Menu_1, Bouton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jeu = void 0;
    var Jeu = /** @class */ (function () {
        function Jeu(refScene) {
            this.refScene = null;
            this.rue = null;
            this.menu = null;
            this.bouton = null;
            this.ricardo = null;
            this.tAntagoniste = [];
            this.tDynamite = [];
            this.tminDynamite = [];
            this.refScene = refScene;
            this.afficherMenu();
        }
        Jeu.prototype.debuter = function () {
            this.rue = new Rue_1.Rue(this.refScene);
            this.ricardo = new Ricardo_1.Ricardo(this.refScene, window.lib.properties.width / 2, window.lib.properties.height - 60);
            this.tAntagoniste.push(new Maki_1.Maki(this.refScene, window.lib.properties.width * 0.35, 150));
            this.tAntagoniste.push(new Wasabi_1.Wasabi(this.refScene, window.lib.properties.width * 0.65, 150));
            for (var i = 0; i < this.tAntagoniste.length; i++) {
                console.log(this);
                window.setInterval(this.gestionDynamite.bind(this), 1000, this.tAntagoniste[i]);
            }
        };
        Jeu.prototype.afficherMenu = function () {
            this.menu = new Menu_1.Menu(this.refScene);
            this.bouton = new Bouton_1.Bouton(this.refScene, 300, 666, 0);
            this.bouton.addEventListener("click", this.menuPageSuivante.bind(this), false);
        };
        Jeu.prototype.menuPageSuivante = function () {
            if (this.menu.currentFrame == 0) {
                this.menu.pageSuivante();
                this.bouton.setLabel(1);
            }
            else {
                this.menu.detruire();
                this.bouton.detruire();
                this.debuter();
            }
        };
        Jeu.prototype.gestionDynamite = function (antagoniste) {
            var _this = this;
            // Ajout de la dynamite
            this.tDynamite.push(antagoniste.lanceDynamite());
            // Suppression de dynamite hors vu
            this.tDynamite.forEach(function (dynamite) {
                if (dynamite.y > window.lib.properties.height + 100) {
                    dynamite.detruire();
                    _this.tDynamite.splice(_this.tDynamite.indexOf(dynamite), 1);
                }
            });
            console.table(this.tDynamite);
        };
        return Jeu;
    }());
    exports.Jeu = Jeu;
});
//# sourceMappingURL=Jeu.js.map