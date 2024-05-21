import { ObjetVisible } from "./ObjetVisible";
/**
 * @class Missile
 * @description Un Missile dans le jeu. Il ne peut y en avoir qu'un seul
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Missile extends ObjetVisible {

	vitesse: number = null;

	/**
	 * Constructeur de Missile
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 * @param rotation Rotation de l'objet
	 */
	constructor(posX: number, posY: number, rotation:number) {
		super(posX, posY);
		this.vitesse = 3;
		this.rotation = rotation;

		this.addEventListener("tick", this.bouger.bind(this), false);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipMissile.call(this);
		this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
	}

	/**
	 * gère le mouvement du missile
	 */
	private bouger(): void {
		this.y -= Math.cos(this.rotation*(Math.PI/180))* (this.vitesse += 2);
		this.x += Math.sin(this.rotation*(Math.PI/180))* this.vitesse;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.removeAllEventListeners();
		this.vitesse = null;
		super.destructeur();
	}
}