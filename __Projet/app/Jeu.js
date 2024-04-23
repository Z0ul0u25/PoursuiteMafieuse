define(["require", "exports", "./Rue", "./Ricardo", "./Maki", "./Wasabi"], function (require, exports, Rue_1, Ricardo_1, Maki_1, Wasabi_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jeu = void 0;
    var Jeu = /** @class */ (function () {
        function Jeu(refScene) {
            this.refScene = null;
            this.ricardo = null;
            this.tAntagoniste = [];
            this.rue = null;
            this.refScene = refScene;
            this.debuter();
        }
        Jeu.prototype.debuter = function () {
            this.rue = new Rue_1.Rue(this.refScene);
            this.ricardo = new Ricardo_1.Ricardo(this.refScene, window.lib.properties.width / 2, window.lib.properties.height - 60);
            this.tAntagoniste.push(new Maki_1.Maki(this.refScene, window.lib.properties.width * 0.35, 150));
            this.tAntagoniste.push(new Wasabi_1.Wasabi(this.refScene, window.lib.properties.width * 0.65, 150));
        };
        return Jeu;
    }());
    exports.Jeu = Jeu;
});
//# sourceMappingURL=Jeu.js.map