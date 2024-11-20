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
    /**
     * @class Antagoniste
     * @description Abstraite. Tout ce qu'un antagoniste à de besoin pour exister
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Antagoniste = /** @class */ (function (_super) {
        __extends(Antagoniste, _super);
        /**
         * Constrcteur d'Antagoniste
         * @param posX Position en X sur la scene
         * @param posY Position en Y sur la scene
         */
        function Antagoniste(posX, posY) {
            var _this = _super.call(this, posX, posY) || this;
            _this.addEventListener("tick", _this.faireBouger.bind(_this), false);
            return _this;
        }
        /**
         * Construit une nouvelle Dynamite
         * @param deltaX Position en X par rapport à l'antagoniste
         * @param deltaY Position en Y par rapport à l'antagoniste
         * @returns Une Dynamite
         */
        Antagoniste.prototype.lanceDynamite = function (deltaX, deltaY) {
            return new Dynamite_1.Dynamite(this.x + deltaX, this.y + deltaY);
        };
        /**
         * Détruit l'antagoniste l'orsqu'il n'est plus à l'écran si perdu
         */
        Antagoniste.prototype.sortiDecran = function () {
            if (this.y <= -128) {
                ObjetVisible_1.ObjetVisible.refJeu.detruireAntagoniste(this);
            }
        };
        /**
         * Gère le mouvement de l'antagoniste si le jeu est perdu
         */
        Antagoniste.prototype.departDeFin = function () {
            this.gotoAndStop(0);
            this.vitesseY = -5;
            this.addEventListener("tick", this.sortiDecran.bind(this), false);
        };
        /**
         * Destructeur
         */
        Antagoniste.prototype.destructeur = function () {
            _super.prototype.destructeur.call(this);
        };
        return Antagoniste;
    }(Voiture_1.Voiture));
    exports.Antagoniste = Antagoniste;
});
//# sourceMappingURL=Antagoniste.js.map