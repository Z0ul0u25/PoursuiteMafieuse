import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Maki
 * @description Premier Antagoniste du Jeu
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Maki extends Antagoniste{

	protected pointVie: number;

	/**
	 * Constructeur de Maki
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 */
	public constructor(posX:number, posY:number) {
		super(posX, posY);
		this.pointVie = 2;
		this.name = "Maki";
	}

	/**
	 * Gestion du mouvement
	 */
	protected faireBouger(): void {
		// Maki à la base à une vitesse en Y de 0
		// Donc cela n'aura un effet seulement lorsqu'il sera mort
		this.y += this.vitesseY;

		if (this.y > window.lib.properties.height + 128){
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipMaki.call(this);
		this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		super.destructeur();
	}

}