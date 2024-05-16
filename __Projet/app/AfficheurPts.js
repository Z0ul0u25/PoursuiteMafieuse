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
    exports.AfficheurPts = void 0;
    var AfficheurPts = /** @class */ (function (_super) {
        __extends(AfficheurPts, _super);
        function AfficheurPts() {
            var _this = _super.call(this, "0 pts", "32px komika", "#fb6431") || this;
            _this.fond = null;
            _this.x = 580;
            _this.y = 750;
            _this.textAlign = "right";
            _this.fond = new createjs.Shape();
            _this.fond.graphics.beginFill("#000000").drawRect(200, 950, 400, 200);
            _this.fond.regX = 200;
            _this.fond.regY = 100;
            _this.fond.alpha = 0.5;
            _this.fond.rotation = -20;
            ObjetVisible_1.ObjetVisible.refJeu.getScene().addChild(_this.fond);
            return _this;
        }
        AfficheurPts.prototype.majPointage = function (valeur) {
            this.text = String(parseInt(this.text.split(" ")[0]) + valeur) + " pts";
        };
        AfficheurPts.prototype.destructeur = function () {
            ObjetVisible_1.ObjetVisible.refJeu.getScene().removeChild(this);
        };
        return AfficheurPts;
    }(createjs.Text));
    exports.AfficheurPts = AfficheurPts;
});
//# sourceMappingURL=AfficheurPts.js.map