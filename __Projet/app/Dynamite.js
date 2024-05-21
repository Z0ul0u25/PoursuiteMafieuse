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
define(["require", "exports", "./ObjetVisible"], function (require, exports, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dynamite = void 0;
    /**
     * @class Dynamite
     * @description Instanciation de Dynamite
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Dynamite = /** @class */ (function (_super) {
        __extends(Dynamite, _super);
        /**
         * Constructeur de Dynamite
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         */
        function Dynamite(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.addEventListener("tick", _this.bouger.bind(_this), false);
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Dynamite.prototype.dessiner = function () {
            window.lib.ClipDynamite.call(this);
            this.frameBounds = window.lib.ClipDynamite.prototype.frameBounds;
        };
        /**
         * Gestion du mouvement
         */
        Dynamite.prototype.bouger = function () {
            this.y += 20;
        };
        /**
         * Destructeur
         */
        Dynamite.prototype.destructeur = function () {
            this.removeAllEventListeners();
            _super.prototype.destructeur.call(this);
        };
        return Dynamite;
    }(ObjetVisible_1.ObjetVisible));
    exports.Dynamite = Dynamite;
});
//# sourceMappingURL=Dynamite.js.map