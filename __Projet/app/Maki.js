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
    exports.Maki = void 0;
    var Maki = /** @class */ (function (_super) {
        __extends(Maki, _super);
        function Maki(refScene, posX, posY) {
            var _this = _super.call(this, refScene, posX, posY) || this;
            _this.pointVie = 2;
            _this.name = "Maki";
            return _this;
        }
        Maki.prototype.faireBouger = function () {
            if (this.pointVie <= 0) {
                this.y += 20;
            }
            if (this.y >= window.lib.properties.height + 100) {
                _super.prototype.detruire.call(this);
            }
        };
        Maki.prototype.dessiner = function () {
            window.lib.ClipMaki.call(this);
            this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
        };
        return Maki;
    }(Antagoniste_1.Antagoniste));
    exports.Maki = Maki;
});
//# sourceMappingURL=Maki.js.map