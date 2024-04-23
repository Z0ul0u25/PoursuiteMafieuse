import { ObjetVisible } from "./ObjetVisible";
export class Rue extends ObjetVisible {
	private refScene:createjs.Stage = null;

	private _defilement = this.defilement.bind(this);

	constructor(refScene: createjs.Stage) {
		super(refScene, 0, 0);
		this.addEventListener("tick", this._defilement, false);
	}

	protected dessiner(): void {
		window.lib.ClipRue.call(this);
		this.frameBounds = window.lib.ClipRue.prototype.frameBounds;
	}

	public detruire(): void {
		super.detruire();
	}

	private defilement(): void{
		this.y+=20;
		if(this.y >= window.lib.properties.height){
			this.y = 0;
		}
	}

}