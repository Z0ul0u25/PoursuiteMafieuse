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
define(["require", "exports", "./ObjetVisible", "./Bouton"], function (require, exports, ObjetVisible_1, Bouton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Menu = void 0;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super.call(this, 0, 0) || this;
            _this.bouton = null;
            var queue = new createjs.LoadQueue(true, "./", true);
            //Enregistre un plugin pour le sound (ici createjs.Sound)
            queue.installPlugin(createjs.Sound);
            //Déclare un écouteur pour la fin du chargement
            queue.addEventListener("complete", _this.chargementFini.bind(_this));
            //Déclare un écouteur pour superviser le progrès du chargement
            // queue.addEventListener("progress",this._surProgresChargementBindRef);
            //Déclare un écouteur pour superviser une erreur sur le chargement
            queue.addEventListener("error", _this.chargementErreur.bind(_this));
            //Charge les fichiers du manifeste
            queue.loadManifest(window.lib.properties.manifest);
            return _this;
        }
        Menu.prototype.dessiner = function () {
            window.lib.ClipMenu.call(this);
            this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
        };
        Menu.prototype.pageSuivante = function () {
            if (this.currentFrame != 1) {
                this.gotoAndStop(1);
                this.bouton.setLabel(1);
            }
            else {
                this.visible = false;
                ObjetVisible_1.ObjetVisible.refJeu.debuter();
            }
        };
        Menu.prototype.chargementFini = function () {
            this.bouton = new Bouton_1.Bouton(300, 666, 0);
            this.bouton.addEventListener("click", this.pageSuivante.bind(this), false);
        };
        Menu.prototype.chargementErreur = function () {
            console.log("Errrrror");
        };
        Menu.prototype.detruire = function () {
            _super.prototype.detruire.call(this);
        };
        Menu.prototype.setVisibilite = function (b) {
            this.visible = b;
        };
        Menu.prototype.getRefBouton = function () {
            return this.bouton;
        };
        return Menu;
    }(ObjetVisible_1.ObjetVisible));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map