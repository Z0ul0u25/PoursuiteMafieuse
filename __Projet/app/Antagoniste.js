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
define(["require", "exports", "./Dynamite", "./Voiture", "./ObjetVisible"], function (require, exports, Dynamite_1, Voiture_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Antagoniste = void 0;
    var Antagoniste = /** @class */ (function (_super) {
        __extends(Antagoniste, _super);
        function Antagoniste(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this._faireBouger = _this.faireBouger.bind(_this);
            _this.addEventListener("tick", _this._faireBouger, false);
            return _this;
        }
        Antagoniste.prototype.lanceDynamite = function () {
            return new Dynamite_1.Dynamite(this.x, this.y);
        };
        Antagoniste.prototype.sortiDecran = function () {
            if (this.y <= -128) {
                ObjetVisible_1.ObjetVisible.refJeu.detruireAntagoniste(this);
            }
        };
        Antagoniste.prototype.departDeFin = function () {
            this.vitesseY = -5;
            this.addEventListener("tick", this.sortiDecran.bind(this), false);
        };
        Antagoniste.prototype.detruire = function () {
            this.removeAllEventListeners();
            _super.prototype.detruire.call(this);
        };
        return Antagoniste;
    }(Voiture_1.Voiture));
    exports.Antagoniste = Antagoniste;
});
//# sourceMappingURL=Antagoniste.js.map