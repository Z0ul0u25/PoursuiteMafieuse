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
            return _super.call(this, refScene, posX, posY) || this;
        }
        Maki.prototype.faireBouger = function () {
            throw new Error("Method not implemented.");
        };
        Maki.prototype.dessiner = function () {
            window.lib.ClipMaki.call(this);
            this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
        };
        return Maki;
    }(Antagoniste_1.Antagoniste));
    exports.Maki = Maki;
});
//# sourceMappingURL=Maki%20copy.js.map