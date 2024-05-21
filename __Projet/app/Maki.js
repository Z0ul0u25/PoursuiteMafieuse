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
define(["require", "exports", "./Antagoniste", "./ObjetVisible"], function (require, exports, Antagoniste_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Maki = void 0;
    /**
     * @class Maki
     * @description Premier Antagoniste du Jeu
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Maki = /** @class */ (function (_super) {
        __extends(Maki, _super);
        /**
         * Constructeur de Maki
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         */
        function Maki(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.pointVie = 2;
            _this.name = "Maki";
            return _this;
        }
        /**
         * Gestion du mouvement
         */
        Maki.prototype.faireBouger = function () {
            // Maki à la base à une vitesse en Y de 0
            // Donc cela n'aura un effet seulement lorsqu'il sera mort
            this.y += this.vitesseY;
            if (this.y > window.lib.properties.height + 128) {
                ObjetVisible_1.ObjetVisible.refJeu.detruireAntagoniste(this);
            }
        };
        /**
         * Assigne le clip pour affichage visuel
         */
        Maki.prototype.dessiner = function () {
            window.lib.ClipMaki.call(this);
            this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
        };
        /**
         * Destructeur
         */
        Maki.prototype.destructeur = function () {
            _super.prototype.destructeur.call(this);
        };
        return Maki;
    }(Antagoniste_1.Antagoniste));
    exports.Maki = Maki;
});
//# sourceMappingURL=Maki.js.map