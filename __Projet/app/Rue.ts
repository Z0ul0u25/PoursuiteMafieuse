import { ObjetVisible } from "./ObjetVisible";
export class Rue extends ObjetVisible {
	private refScene:createjs.Stage = null;

	private _defilement = this.defilement.bind(this);

	constructor() {
		super(0, 0);
		this.addEventListener("tick", this._defilement, false);
	}

	protected dessiner(): void {
		window.lib.ClipRue.call(this);
		this.frameBounds = window.lib.ClipRue.prototype.frameBounds;
	}

	public detruire(): void {
		super.detruire();
	}

	public arreterDefilement():void{
		this.removeEventListener("tick", this._defilement);
	}

	private defilement(): void{
		this.y+=20;
		if(this.y >= window.lib.properties.height){
			// À 0 il y a une fine line blanche qui apparait
			// Donc on le met à 1
			this.y = 1;
		}
	}

}