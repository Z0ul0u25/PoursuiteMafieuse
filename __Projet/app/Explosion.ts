import { ObjetVisible } from "./ObjetVisible";

export class Explosion extends ObjetVisible {
	timeout: number = null;
	constructor(posX: number, posY: number) {
		super(posX, posY);
		this.scale= 2;
		// autodestruction après animation;
		this.timeout = setTimeout(this.detruire.bind(this), 1000 / 30 * 15);
	}
	protected dessiner(): void {
		window.lib.ClipExplosion.call(this);
		this.frameBounds = window.lib.ClipExplosion.prototype.frameBounds;
	}

	public detruire(): void {
		clearTimeout(this.timeout);
		this.timeout = null;
		super.detruire();
	}
}