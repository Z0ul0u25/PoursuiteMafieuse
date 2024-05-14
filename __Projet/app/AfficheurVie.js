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
    var AfficheurVie = /** @class */ (function (_super) {
        __extends(AfficheurVie, _super);
        function AfficheurVie() {
            return _super.call(this, 5, window.lib.properties.height - 69) || this;
        }
        AfficheurVie.prototype.dessiner = function () {
            window.lib.ClipAfficheurVie.call(this);
            this.frameBounds = window.lib.ClipAfficheurVie.prototype.frameBounds;
        };
        AfficheurVie.prototype.maj = function (pv) {
            if (pv < 0) {
                pv = 0;
            }
            this.gotoAndStop(Math.floor(8 - pv * 2));
        };
        AfficheurVie.prototype.destructeur = function () {
            _super.prototype.destructeur.call(this);
        };
        return AfficheurVie;
    }(ObjetVisible_1.ObjetVisible));
    exports.AfficheurVie = AfficheurVie;
});
//# sourceMappingURL=AfficheurVie.js.map