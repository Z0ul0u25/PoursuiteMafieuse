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
define(["require", "exports", "./Antagoniste", "./ObjetVisible"], function (require, exports, Antagoniste_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Wasabi = void 0;
    /**
     * @class Wasabi
     * @description Deuxième Antagoniste du jeu
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Wasabi = /** @class */ (function (_super) {
        __extends(Wasabi, _super);
        /**
         * Constructeur de Wasabi
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         */
        function Wasabi(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.sens = 1;
            _this.name = "Wasabi";
            _this.accelDelta = 0.5;
            _this.vitesseMax = 8;
            _this.vitesseX = null;
            _this.vitesseY = null;
            _this.rotationRatio = 3;
            _this.pointVie = 2;
            _this.zoneLimite = [64, window.lib.properties.width - 188, window.lib.properties.height / 2 - 32, window.lib.properties.width / 2 + 96];
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Wasabi.prototype.dessiner = function () {
            window.lib.ClipWasabi.call(this);
            this.frameBounds = window.lib.ClipWasabi.prototype.frameBounds;
        };
        /**
         * Gestion du mouvement
         */
        Wasabi.prototype.faireBouger = function () {
            if (this.pointVie > 0) {
                // Va faire des mouvement de gauche à droite
                if (this.sens == 1 && this.x >= this.zoneLimite[1]) {
                    if (this.vitesseX > 0) {
                        this.vitesseX -= this.accelDelta;
                    }
                    else {
                        this.sens = -1;
                    }
                }
                else if (this.sens == -1 && this.x <= this.zoneLimite[3]) {
                    if (this.vitesseX > 0) {
                        this.vitesseX -= this.accelDelta;
                    }
                    else {
                        this.sens = 1;
                    }
                }
                else if (this.vitesseX < this.vitesseMax) {
                    this.vitesseX += this.accelDelta;
                }
            }
            this.x += this.vitesseX * this.sens;
            this.y += this.vitesseY;
            this.rotation = this.vitesseX * this.rotationRatio * this.sens;
            if (this.y > window.lib.properties.height + 128) {
                ObjetVisible_1.ObjetVisible.refJeu.detruireAntagoniste(this);
            }
        };
        /**
         * Destructeur
         */
        Wasabi.prototype.destructeur = function () {
            _super.prototype.destructeur.call(this);
        };
        return Wasabi;
    }(Antagoniste_1.Antagoniste));
    exports.Wasabi = Wasabi;
});
//# sourceMappingURL=Wasabi.js.map