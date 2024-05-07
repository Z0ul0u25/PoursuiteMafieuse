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
    exports.Rue = void 0;
    var Rue = /** @class */ (function (_super) {
        __extends(Rue, _super);
        function Rue() {
            var _this = _super.call(this, 0, 0) || this;
            _this.refScene = null;
            _this._defilement = _this.defilement.bind(_this);
            _this.addEventListener("tick", _this._defilement, false);
            return _this;
        }
        Rue.prototype.dessiner = function () {
            window.lib.ClipRue.call(this);
            this.frameBounds = window.lib.ClipRue.prototype.frameBounds;
        };
        Rue.prototype.detruire = function () {
            _super.prototype.detruire.call(this);
        };
        Rue.prototype.arreterDefilement = function () {
            this.removeEventListener("tick", this._defilement);
        };
        Rue.prototype.defilement = function () {
            this.y += 20;
            if (this.y >= window.lib.properties.height) {
                this.y = 0;
            }
        };
        return Rue;
    }(ObjetVisible_1.ObjetVisible));
    exports.Rue = Rue;
});
//# sourceMappingURL=Rue.js.map