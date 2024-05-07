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
    var Dynamite = /** @class */ (function (_super) {
        __extends(Dynamite, _super);
        function Dynamite(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.addEventListener("tick", _this.bouger.bind(_this), false);
            return _this;
        }
        Dynamite.prototype.dessiner = function () {
            window.lib.ClipDynamite.call(this);
            this.frameBounds = window.lib.ClipDynamite.prototype.frameBounds;
        };
        Dynamite.prototype.detruire = function () {
            this.removeAllEventListeners();
            _super.prototype.detruire.call(this);
        };
        Dynamite.prototype.bouger = function () {
            this.y += 20;
        };
        return Dynamite;
    }(ObjetVisible_1.ObjetVisible));
    exports.Dynamite = Dynamite;
});
//# sourceMappingURL=Dynamite.js.map