import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Explosion
 * @description Particule d'explosion
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Explosion extends ObjetVisible {

	timeout: number = null;

	/**
	 * Constructeur d'Explosion
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 * @param estDynamite Si l'explosion provient d'une Dynamite
	 */
	constructor(posX: number, posY: number, estDynamite:boolean) {
		super(posX, posY);
		// Si l'explosion ne vient pas d'une Dynamite elle sera plus grosse
		this.scale = (estDynamite?2:3);
		// Autodestruction après animation;
		this.timeout = setTimeout(this.destructeur.bind(this), 1000 / 30 * 15);
		// Joue un son différent si elle provient d'une dynamite
		let type:string = (estDynamite?"explosion_dynamite":"explosion");
		createjs.Sound.play(type);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipExplosion.call(this);
		this.frameBounds = window.lib.ClipExplosion.prototype.frameBounds;
	}

	/**
	 * Destructor
	 */
	public destructeur(): void {
		clearTimeout(this.timeout);
		this.timeout = null;
		super.destructeur();
	}
}