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
    exports.Voiture = void 0;
    /**
     * @class Voiture
     * @description Abstraite. Tout ce que les voitures auront de besoin
     */
    var Voiture = /** @class */ (function (_super) {
        __extends(Voiture, _super);
        /**
         * Constructeur de Voiture
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         */
        function Voiture(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.vitesseX = 0;
            _this.vitesseY = 0;
            return _this;
        }
        /**
         * Fait perdre des points de vies
         * @param degreDeViolenceRecu Nombre de domage reçu
         */
        Voiture.prototype.jmeSuisFaitToucherPisCaFaitMal = function (degreDeViolenceRecu) {
            this.pointVie -= degreDeViolenceRecu;
            if (this.pointVie <= 0) {
                this.gotoAndPlay("mort");
                if (this.name != "Ricardo" && this.name != "Boss") {
                    this.alpha = 0.5;
                }
                this.vitesseY = 20;
                this.vitesseX = 0;
            }
        };
        /**
         * Destructeur
         */
        Voiture.prototype.destructeur = function () {
            this.accelDelta = null;
            this.vitesseMax = null;
            this.vitesseX = null;
            this.vitesseY = null;
            this.rotationRatio = null;
            this.zoneLimite = null;
            this.pointVie = null;
            _super.prototype.destructeur.call(this);
        };
        return Voiture;
    }(ObjetVisible_1.ObjetVisible));
    exports.Voiture = Voiture;
});
//# sourceMappingURL=Voiture.js.map