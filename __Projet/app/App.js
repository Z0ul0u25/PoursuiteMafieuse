define(["require", "exports", "./Jeu"], function (require, exports, Jeu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = /** @class */ (function () {
        // Méthodes
        function App() {
            // Attributs
            this.scene = null;
            this.jeu = null;
            window.init(this); // Initialiser l'animation avec le méthode générée par Animate CC.
        }
        App.prototype.initialiser = function (refscene) {
            // Initialisation des attributs relatifs à l'animation ------------------------------------------------------------------
            this.scene = refscene; // Récupérer la références de la scène nouvellement créée
            createjs.Ticker.framerate = 30; // Vitesse de l'animation (peut être modifiée si nécessaire)
            window.addEventListener("blur", this.tickFocus.bind(this), false);
            window.addEventListener("focus", this.tickFocus.bind(this), false);
            // ----------------------------------------------------------------------------------------------------------------------
            this.jeu = new Jeu_1.Jeu(this.scene);
        };
        App.prototype.tickFocus = function (e) {
            this.scene.tickEnabled = e.type == "focus";
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=App.js.map