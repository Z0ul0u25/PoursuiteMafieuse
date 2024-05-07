import { Jeu } from "./Jeu";
import { ObjetVisible } from "./ObjetVisible";
export class Rue extends ObjetVisible {
	private refScene:createjs.Stage = null;

	private _defilement = this.defilement.bind(this);

	constructor(refJeu:Jeu) {
		super(refJeu, 0, 0);
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
			this.y = 0;
		}
	}

}