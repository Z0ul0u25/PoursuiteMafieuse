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
    exports.Explosion = void 0;
    /**
     * @class Explosion
     * @description Particule d'explosion
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        /**
         * Constructeur d'Explosion
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         * @param estDynamite Si l'explosion provient d'une Dynamite
         */
        function Explosion(posX, posY, estDynamite) {
            var _this = _super.call(this, posX, posY) || this;
            _this.timeout = null;
            // Si l'explosion ne vient pas d'une Dynamite elle sera plus grosse
            _this.scale = (estDynamite ? 2 : 3);
            // Autodestruction après animation;
            _this.timeout = setTimeout(_this.destructeur.bind(_this), 1000 / 30 * 15);
            // Joue un son différent si elle provient d'une dynamite
            var type = (estDynamite ? "explosion_dynamite" : "explosion");
            createjs.Sound.play(type);
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Explosion.prototype.dessiner = function () {
            window.lib.ClipExplosion.call(this);
            this.frameBounds = window.lib.ClipExplosion.prototype.frameBounds;
        };
        /**
         * Destructor
         */
        Explosion.prototype.destructeur = function () {
            clearTimeout(this.timeout);
            this.timeout = null;
            _super.prototype.destructeur.call(this);
        };
        return Explosion;
    }(ObjetVisible_1.ObjetVisible));
    exports.Explosion = Explosion;
});
//# sourceMappingURL=Explosion.js.map