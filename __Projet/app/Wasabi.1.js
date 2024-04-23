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
define(["require", "exports", "./Antagoniste"], function (require, exports, Antagoniste_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Wasabi = void 0;
    var Wasabi = /** @class */ (function (_super) {
        __extends(Wasabi, _super);
        function Wasabi(refScene, posX, posY) {
            var _this = _super.call(this, refScene, posX, posY) || this;
            _this.zoneLimite = [64, window.lib.properties.width - 32, window.lib];
            return _this;
        }
        Wasabi.prototype.faireBouger = function () {
            throw new Error("Method not implemented.");
        };
        Wasabi.prototype.dessiner = function () {
            window.lib.ClipWasabi.call(this);
            this.frameBounds = window.lib.ClipWasabi.prototype.frameBounds;
        };
        return Wasabi;
    }(Antagoniste_1.Antagoniste));
    exports.Wasabi = Wasabi;
});
//# sourceMappingURL=Wasabi.1.js.map