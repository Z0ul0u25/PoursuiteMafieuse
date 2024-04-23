import { ObjetVisible } from "./ObjetVisible";
import { Ricardo } from "./Ricardo";

export class Rue extends ObjetVisible {
	private refScene:createjs.Stage = null;

	private ricardo:Ricardo=null;

	private _defilement = this.defilement.bind(this);

	constructor(refScene: createjs.Stage) {
		super(refScene, 0, 800);
		this.refScene = refScene;
		this.debuter();
		this.addEventListener("tick", this._defilement, false);
	}

	public debuter():void{
		this.ricardo = new Ricardo(this.refScene, window.lib.properties.width/2, window.lib.properties.height-60);
	}

	public dessiner(): void {
		window.lib.ClipRoute.call(this);
		this.frameBounds = window.lib.ClipRoute.prototype.frameBounds;
	}

	public detruire(): void {
		super.detruire();
	}

	private defilement(): void{
		this.y+=20;
		if(this.y > 1599){
			this.y = 800;
		}

	}

}