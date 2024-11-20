import { ObjetVisible } from "./ObjetVisible";
/**
 * @class Rue
 * @description Le fond du jeu
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Rue extends ObjetVisible {
	private _defilement = this.defilement.bind(this);

	/**
	 * Constructeur de Rue
	 */
	constructor() {
		super(0, 0);
		this.addEventListener("tick", this._defilement, false);
	}

	/**
	 * Sera redéfini dans toutes les sous classes selon le Clip
	 */
	protected dessiner(): void {
		window.lib.ClipRue.call(this);
		this.frameBounds = window.lib.ClipRue.prototype.frameBounds;
	}

	/**
	 * Arrête la rue
	 */
	public arreterDefilement():void{
		this.removeEventListener("tick", this._defilement);
	}

	/**
	 * Fait bouger la rue
	 */
	private defilement(): void{
		this.y+=20;
		if(this.y >= window.lib.properties.height){
			// À 0 il y a une fine line blanche qui apparait
			// Donc on le met à 1
			this.y = 1;
		}
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this._defilement = null;
		this.removeAllEventListeners();
		super.destructeur();
	}
}