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
define(["require", "exports", "./ObjetVisible", "./Ricardo"], function (require, exports, ObjetVisible_1, Ricardo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rue = void 0;
    var Rue = /** @class */ (function (_super) {
        __extends(Rue, _super);
        function Rue(refScene) {
            var _this = _super.call(this, refScene, 0, 800) || this;
            _this.refScene = null;
            _this.ricardo = null;
            _this._defilement = _this.defilement.bind(_this);
            _this.refScene = refScene;
            _this.debuter();
            _this.addEventListener("tick", _this._defilement, false);
            return _this;
        }
        Rue.prototype.debuter = function () {
            this.ricardo = new Ricardo_1.Ricardo(this.refScene, window.lib.properties.width / 2, window.lib.properties.height - 60);
        };
        Rue.prototype.dessiner = function () {
            window.lib.ClipRoute.call(this);
            this.frameBounds = window.lib.ClipRoute.prototype.frameBounds;
        };
        Rue.prototype.detruire = function () {
            _super.prototype.detruire.call(this);
        };
        Rue.prototype.defilement = function () {
            this.y += 20;
            if (this.y > 1599) {
                this.y = 800;
            }
        };
        return Rue;
    }(ObjetVisible_1.ObjetVisible));
    exports.Rue = Rue;
});
//# sourceMappingURL=Rue.js.map