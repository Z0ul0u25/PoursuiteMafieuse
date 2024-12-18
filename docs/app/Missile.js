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
    exports.Missile = void 0;
    /**
     * @class Missile
     * @description Un Missile dans le jeu. Il ne peut y en avoir qu'un seul
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Missile = /** @class */ (function (_super) {
        __extends(Missile, _super);
        /**
         * Constructeur de Missile
         * @param posX Position en X sur la scène
         * @param posY Position en Y sur la scène
         * @param rotation Rotation de l'objet
         */
        function Missile(posX, posY, rotation) {
            var _this = _super.call(this, posX, posY) || this;
            _this.vitesse = null;
            _this.vitesse = 3;
            _this.rotation = rotation;
            _this.addEventListener("tick", _this.bouger.bind(_this), false);
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Missile.prototype.dessiner = function () {
            window.lib.ClipMissile.call(this);
            this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
        };
        /**
         * gère le mouvement du missile
         */
        Missile.prototype.bouger = function () {
            this.y -= Math.cos(this.rotation * (Math.PI / 180)) * (this.vitesse += 2);
            this.x += Math.sin(this.rotation * (Math.PI / 180)) * this.vitesse;
        };
        /**
         * Destructeur
         */
        Missile.prototype.destructeur = function () {
            this.removeAllEventListeners();
            this.vitesse = null;
            _super.prototype.destructeur.call(this);
        };
        return Missile;
    }(ObjetVisible_1.ObjetVisible));
    exports.Missile = Missile;
});
//# sourceMappingURL=Missile.js.map