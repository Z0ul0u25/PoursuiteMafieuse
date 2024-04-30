import { ObjetVisible } from "./ObjetVisible";

export class Missile extends ObjetVisible{
	vitesse:number = null;

	constructor(refScene:createjs.Stage, posX:number, posY:number) {
		super(refScene, posX, posY);
		this.vitesse = 3;

		this.addEventListener("tick", this.bouger.bind(this), false);
	}

	protected dessiner(): void {
		window.lib.ClipMissile.call(this);
		this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
	}

	private bouger():void{
		this.y -= this.vitesse++;
	}

	public detruire(): void {
		this.removeAllEventListeners();
		this.vitesse = null;
		super.detruire();
	}
}