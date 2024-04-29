import { ObjetVisible } from "./ObjetVisible";

export class Missile extends ObjetVisible{
	constructor(refScene:createjs.Stage, posX:number, posY:number) {
		super(refScene, posX, posY);

	}

	protected dessiner(): void {
		window.lib.ClipMissile.call(this);
		this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
	}

	public detruire(): void {
		super.detruire();
	}
}