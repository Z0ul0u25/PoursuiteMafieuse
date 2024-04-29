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
    exports.Missile = void 0;
    var Missile = /** @class */ (function (_super) {
        __extends(Missile, _super);
        function Missile(refScene, posX, posY) {
            return _super.call(this, refScene, posX, posY) || this;
        }
        Missile.prototype.dessiner = function () {
            window.lib.ClipMissile.call(this);
            this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
        };
        Missile.prototype.detruire = function () {
            _super.prototype.detruire.call(this);
        };
        return Missile;
    }(ObjetVisible_1.ObjetVisible));
    exports.Missile = Missile;
});
//# sourceMappingURL=Missile.js.map