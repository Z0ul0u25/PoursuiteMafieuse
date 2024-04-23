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
define(["require", "exports", "./Voiture"], function (require, exports, Voiture_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Antagoniste = void 0;
    var Antagoniste = /** @class */ (function (_super) {
        __extends(Antagoniste, _super);
        function Antagoniste(refScene, posX, posY) {
            return _super.call(this, refScene, posX, posY) || this;
        }
        return Antagoniste;
    }(Voiture_1.Voiture));
    exports.Antagoniste = Antagoniste;
});
//# sourceMappingURL=Antagoniste.js.map