define(["require", "exports", "./Ruelle"], function (require, exports, Ruelle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = /** @class */ (function () {
        // Méthodes
        function App() {
            // Attributs
            this.scene = null;
            this.ruelle = null;
            window.init(this); // Initialiser l'animation avec le méthode générée par Animate CC.
        }
        App.prototype.initialiser = function (refscene) {
            // Initialisation des attributs relatifs à l'animation ------------------------------------------------------------------
            this.scene = refscene; // Récupérer la références de la scène nouvellement créée
            createjs.Ticker.framerate = 30; // Vitesse de l'animation (peut être modifiée si nécessaire)
            // ----------------------------------------------------------------------------------------------------------------------
            this.ruelle = new Ruelle_1.Ruelle(this.scene);
        };
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=App.js.map