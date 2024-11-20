import { ObjetVisible } from "./ObjetVisible";

/**
 * @class AfficheurVie
 * @description Afficheur pour représenter les points de vie visuellement
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class AfficheurVie extends ObjetVisible {

	/**
	 * Constructeur d'AfficheurVie
	 */
	constructor() {
		super(5, window.lib.properties.height - 69);
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipAfficheurVie.call(this);
		this.frameBounds = window.lib.ClipAfficheurVie.prototype.frameBounds;
	}

	/**
	 * Met à jour l'affichage de la vie
	 * @param pv point de vie à afficher
	 */
	public maj(pv: number): void {
		if (pv < 0){
			pv = 0;
		}
		/**
		 * Chaque frame de l'animation représente 0.5 point de vie.
		 * Avec un calcul on peut tomber sur le frame voulu selon les points de vie restant.
		 */
		this.gotoAndStop(Math.floor(8 - pv * 2));
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		super.destructeur();
	}
}