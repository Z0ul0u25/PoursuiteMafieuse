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
    exports.Boss = void 0;
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        function Boss(posX, posY, refRicardo) {
            var _this = _super.call(this, posX, posY) || this;
            _this.sens = 1;
            _this.etat = "entree";
            _this.refRicardo = refRicardo;
            _this.name = "Boss";
            _this.pointVie = 6;
            _this.accelDelta = 0.5;
            _this.vitesseMax = 7;
            _this.rotationRatio = 2;
            _this.zoneLimite = [196, window.lib.properties.width - 188, window.lib.properties.height - 32, 188];
            _this.vitesseY = 7;
            _this.stop();
            return _this;
        }
        Boss.prototype.faireBouger = function () {
            switch (this.etat) {
                case "entree":
                    this.vitesseY -= 0.05;
                    if (this.y > this.zoneLimite[0]) {
                        this.play();
                        this.etat = "defaut";
                        this.vitesseY = 0;
                    }
                    break;
                default:
                    if (this.pointVie > 0) {
                        if (this.x < this.refRicardo.x - 42 && this.vitesseX < this.vitesseMax) {
                            this.vitesseX += this.accelDelta;
                        }
                        else if (this.x > this.refRicardo.x + 42 && this.vitesseX > this.vitesseMax * -1) {
                            this.vitesseX -= this.accelDelta;
                        }
                        else if (this.vitesseX != 0) {
                            this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
                            if (this.vitesseX < this.accelDelta && this.vitesseX > this.accelDelta * -1) {
                                this.vitesseX = 0;
                                var ram = Math.random();
                                console.log(ram > 0.9);
                                if (ram > 0.9) {
                                    console.log("time to ram");
                                }
                            }
                        }
                    }
                    break;
            }
            this.x += this.vitesseX * this.sens;
            this.y += this.vitesseY;
            this.rotation = this.vitesseX * this.rotationRatio * this.sens;
            if (this.y > window.lib.properties.height + 128) {
                ObjetVisible_1.ObjetVisible.refJeu.detruireAntagoniste(this);
            }
        };
        Boss.prototype.dessiner = function () {
            window.lib.ClipBoss.call(this);
            this.frameBounds = window.lib.ClipBoss.prototype.frameBounds;
        };
        Boss.prototype.destructeur = function () {
            this.refRicardo = null;
            this.etat = null;
            _super.prototype.destructeur.call(this);
        };
        return Boss;
    }(Antagoniste_1.Antagoniste));
    exports.Boss = Boss;
});
//# sourceMappingURL=Boss.js.map