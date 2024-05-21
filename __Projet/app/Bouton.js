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
    exports.Bouton = void 0;
    /**
     * @class Bouton
     * @description Bouton d'interaction pour le menu
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Bouton = /** @class */ (function (_super) {
        __extends(Bouton, _super);
        /**
         * Constructeur de Bouton
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         * @param indexLabel Index du label à utiliser
         */
        function Bouton(posX, posY, indexLabel) {
            var _this = _super.call(this, posX, posY) || this;
            _this.label = ["continuer", "lancer", "redemarrer"];
            _this.setLabel(indexLabel);
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Bouton.prototype.dessiner = function () {
            window.lib.ClipBouton.call(this);
            this.frameBounds = window.lib.ClipBouton.prototype.frameBounds;
        };
        /**
         * Applique le label demander au Bouton
         * @param indexLable Index du label à utiliser
         */
        Bouton.prototype.setLabel = function (indexLable) {
            this.gotoAndStop(this.label[indexLable]);
        };
        /**
         * Destructeur
         */
        Bouton.prototype.destructeur = function () {
            this.label = null;
            _super.prototype.destructeur.call(this);
        };
        return Bouton;
    }(ObjetVisible_1.ObjetVisible));
    exports.Bouton = Bouton;
});
//# sourceMappingURL=Bouton.js.map