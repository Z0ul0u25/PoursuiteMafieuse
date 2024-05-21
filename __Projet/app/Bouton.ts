import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Bouton
 * @description Bouton d'interaction pour le menu
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Bouton extends ObjetVisible {

	private label = ["continuer", "lancer", "redemarrer"];

	/**
	 * Constructeur de Bouton
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 * @param indexLabel Index du label à utiliser
	 */
	constructor(posX: number, posY: number, indexLabel: number) {
		super(posX, posY);
		this.setLabel(indexLabel);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipBouton.call(this);
		this.frameBounds = window.lib.ClipBouton.prototype.frameBounds;
	}

	/**
	 * Applique le label demander au Bouton
	 * @param indexLable Index du label à utiliser
	 */
	public setLabel(indexLable: number): void {
		this.gotoAndStop(this.label[indexLable]);
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.label = null;
		super.destructeur();
	}
}