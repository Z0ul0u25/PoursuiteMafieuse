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
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        function Explosion(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.timeout = null;
            _this.scale = 2;
            // autodestruction après animation;
            _this.timeout = setTimeout(_this.destructeur.bind(_this), 1000 / 30 * 15);
            createjs.Sound.play("explosion");
            return _this;
        }
        Explosion.prototype.dessiner = function () {
            window.lib.ClipExplosion.call(this);
            this.frameBounds = window.lib.ClipExplosion.prototype.frameBounds;
        };
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