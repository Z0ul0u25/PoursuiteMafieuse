import { ObjetVisible } from "./ObjetVisible";
import { Bouton } from "./Bouton";

/**
 * @class Menu
 * @description Le menu qui sera afficher à l'écran
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Menu extends ObjetVisible {

	private bouton: Bouton = null;

	/**
	 * Constructeur du Menu
	 */
	constructor() {
		super(0, 0);

		// Le menu n'est charger qu'une seule fois au début du jeu
		// Donc il gère le chargement du jeu.
		let queue = new createjs.LoadQueue(true,"./",true);

        // Enregistre un plugin pour le sound (ici createjs.Sound)
        queue.installPlugin(createjs.Sound);

        // Déclare un écouteur pour la fin du chargement
        queue.addEventListener("complete", this.chargementFini.bind(this));

        // Déclare un écouteur pour superviser le progrès du chargement
        // queue.addEventListener("progress",this._surProgresChargementBindRef);

        // Déclare un écouteur pour superviser une erreur sur le chargement
        queue.addEventListener("error", this.chargementErreur.bind(this));

        // Charge les fichiers du manifeste
        queue.loadManifest(window.lib.properties.manifest);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipMenu.call(this);
		this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
	}

	/**
	 * Change la page de menu
	 */
	public pageSuivante():void{
		if (this.currentFrame != 1) {
			this.gotoAndStop(1);
			this.bouton.setLabel(1);
			ObjetVisible.refJeu.cacherPts();
		} else {
			this.visible = false;
			ObjetVisible.refJeu.debuter();
		}
	}

	/**
	 * À la fin du chargement du contenu du jeu
	 * Affichage du bouton pour jouer
	 */
	private chargementFini():void{
		this.bouton = new Bouton(300, 666, 0);
		this.bouton.addEventListener("click", this.pageSuivante.bind(this), false);
	}

	/**
	 * Au cas ou le chargement se passe mal.
	 */
	private chargementErreur():void{
		console.log("Errrrror");
	}

	/**
	 * Change la visibilité du menu pour la valeur choisi
	 * @param visibilite true ou false
	 */
	public setVisibilite(visibilite:boolean):void{
		this.visible = visibilite;
	}

	/**
	 * Obtenir le bouton
	 * @returns Référence du bouton
	 */
	public getRefBouton():Bouton{
		this.bouton.gotoAndStop(2);
		return this.bouton;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.bouton.destructeur();
		this.bouton = null;
		this.removeAllEventListeners();
		super.destructeur();
	}
}