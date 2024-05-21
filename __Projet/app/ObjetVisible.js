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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjetVisible = void 0;
    var ObjetVisible = /** @class */ (function (_super) {
        __extends(ObjetVisible, _super);
        function ObjetVisible(posX, posY) {
            var _this = _super.call(this) || this;
            _this.refStage = null;
            _this.gotoAndStop(0);
            _this.dessiner();
            _this.refStage = ObjetVisible.refJeu.getScene();
            _this.refStage.addChild(_this);
            _this.x = posX;
            _this.y = posY;
            return _this;
        }
        ObjetVisible.prototype.destructeur = function () {
            this.x = null;
            this.y = null;
            this.name = null;
            this.removeAllEventListeners();
            this.refStage.removeChild(this);
        };
        ObjetVisible.refJeu = null;
        return ObjetVisible;
    }(createjs.MovieClip));
    exports.ObjetVisible = ObjetVisible;
});
//# sourceMappingURL=ObjetVisible.js.map