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
    /**
     * @class Menu
     * @description Le menu qui sera afficher à l'écran
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        /**
         * Constructeur du Menu
         */
        function Menu() {
            var _this = _super.call(this, 0, 0) || this;
            _this.bouton = null;
            // Le menu n'est charger qu'une seule fois au début du jeu
            // Donc il gère le chargement du jeu.
            var queue = new createjs.LoadQueue(true, "./", true);
            // Enregistre un plugin pour le sound (ici createjs.Sound)
            queue.installPlugin(createjs.Sound);
            // Déclare un écouteur pour la fin du chargement
            queue.addEventListener("complete", _this.chargementFini.bind(_this));
            // Déclare un écouteur pour superviser le progrès du chargement
            // queue.addEventListener("progress",this._surProgresChargementBindRef);
            // Déclare un écouteur pour superviser une erreur sur le chargement
            queue.addEventListener("error", _this.chargementErreur.bind(_this));
            // Charge les fichiers du manifeste
            queue.loadManifest(window.lib.properties.manifest);
            return _this;
        }
        /**
         * Assigne le clip pour affichage visuel
         */
        Menu.prototype.dessiner = function () {
            window.lib.ClipMenu.call(this);
            this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
        };
        /**
         * Change la page de menu
         */
        Menu.prototype.pageSuivante = function () {
            if (this.currentFrame != 1) {
                this.gotoAndStop(1);
                this.bouton.setLabel(1);
                ObjetVisible_1.ObjetVisible.refJeu.cacherPts();
            }
            else {
                this.visible = false;
                ObjetVisible_1.ObjetVisible.refJeu.debuter();
            }
        };
        /**
         * À la fin du chargement du contenu du jeu
         * Affichage du bouton pour jouer
         */
        Menu.prototype.chargementFini = function () {
            this.bouton = new Bouton_1.Bouton(300, 666, 0);
            this.bouton.addEventListener("click", this.pageSuivante.bind(this), false);
        };
        /**
         * Au cas ou le chargement se passe mal.
         */
        Menu.prototype.chargementErreur = function () {
            console.log("Errrrror");
        };
        /**
         * Change la visibilité du menu pour la valeur choisi
         * @param visibilite true ou false
         */
        Menu.prototype.setVisibilite = function (visibilite) {
            this.visible = visibilite;
        };
        /**
         * Obtenir le bouton
         * @returns Référence du bouton
         */
        Menu.prototype.getRefBouton = function () {
            this.bouton.gotoAndStop(2);
            return this.bouton;
        };
        /**
         * Destructeur
         */
        Menu.prototype.destructeur = function () {
            this.bouton.destructeur();
            this.bouton = null;
            this.removeAllEventListeners();
            _super.prototype.destructeur.call(this);
        };
        return Menu;
    }(ObjetVisible_1.ObjetVisible));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map