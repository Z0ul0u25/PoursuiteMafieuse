define(["require", "exports", "./Rue"], function (require, exports, Rue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = /** @class */ (function () {
        // Méthodes
        function App() {
            // Attributs
            this.scene = null;
            this.rue = null;
            window.init(this); // Initialiser l'animation avec le méthode générée par Animate CC.
        }
        App.prototype.initialiser = function (refscene) {
            // Initialisation des attributs relatifs à l'animation ------------------------------------------------------------------
            this.scene = refscene; // Récupérer la références de la scène nouvellement créée
            createjs.Ticker.framerate = 30; // Vitesse de l'animation (peut être modifiée si nécessaire)
            // ----------------------------------------------------------------------------------------------------------------------
            this.rue = new Rue_1.Rue(this.scene);
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=App.js.map