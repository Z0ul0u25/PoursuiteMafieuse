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
    exports.AfficheurVie = void 0;
    /**
     * @class AfficheurVie
     * @description Afficheur pour représenter les points de vie visuellement
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var AfficheurVie = /** @class */ (function (_super) {
        __extends(AfficheurVie, _super);
        /**
         * Constructeur d'AfficheurVie
         */
        function AfficheurVie() {
            return _super.call(this, 5, window.lib.properties.height - 69) || this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        AfficheurVie.prototype.dessiner = function () {
            window.lib.ClipAfficheurVie.call(this);
            this.frameBounds = window.lib.ClipAfficheurVie.prototype.frameBounds;
        };
        /**
         * Met à jour l'affichage de la vie
         * @param pv point de vie à afficher
         */
        AfficheurVie.prototype.maj = function (pv) {
            if (pv < 0) {
                pv = 0;
            }
            /**
             * Chaque frame de l'animation représente 0.5 point de vie.
             * Avec un calcul on peut tomber sur le frame voulu selon les points de vie restant.
             */
            this.gotoAndStop(Math.floor(8 - pv * 2));
        };
        /**
         * Destructeur
         */
        AfficheurVie.prototype.destructeur = function () {
            _super.prototype.destructeur.call(this);
        };
        return AfficheurVie;
    }(ObjetVisible_1.ObjetVisible));
    exports.AfficheurVie = AfficheurVie;
});
//# sourceMappingURL=AfficheurVie.js.map