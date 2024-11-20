import { Jeu } from "./Jeu";

/**
 * @class ObjetVisible
 * @description Abstraite. Tout ce qu'un objet sur la scène à besoin pour exister
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export abstract class ObjetVisible extends createjs.MovieClip {

	private refStage: createjs.Stage = null;
	static refJeu:Jeu = null;

	/**
	 * Constructeur d'objet étendu de createjs.MovieClip
	 * @param posX Position en X sur la scène
	 * @param posY Positoin en Y sur la scène
	 */
	public constructor(posX: number, posY: number) {
		super();
		this.gotoAndStop(0);
		this.dessiner();
		this.refStage = ObjetVisible.refJeu.getScene();
		this.refStage.addChild(this);

		this.x = posX;
		this.y = posY;
	}

	/**
	 * Sera redéfini dans toutes les sous classes selon le Clip
	 */
	protected abstract dessiner(): void;

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.x = null;
		this.y = null;
		this.name = null;
		// Retire tous les EventListener ayant été ajouté à l'objet
		this.removeAllEventListeners();
		this.refStage.removeChild(this);
	}
}