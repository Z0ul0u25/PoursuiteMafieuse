import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Dynamite
 * @description Instanciation de Dynamite
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Dynamite extends ObjetVisible {

	/**
	 * Constructeur de Dynamite
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 */
	constructor(posX: number, posY: number) {
		super(posX, posY);
		this.addEventListener("tick", this.bouger.bind(this), false);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipDynamite.call(this);
		this.frameBounds = window.lib.ClipDynamite.prototype.frameBounds;
	}

	/**
	 * Gestion du mouvement
	 */
	private bouger() {
		this.y += 20;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.removeAllEventListeners();
		super.destructeur();
	}

}