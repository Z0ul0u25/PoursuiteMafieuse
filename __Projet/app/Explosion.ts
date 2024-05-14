import { ObjetVisible } from "./ObjetVisible";

export class Explosion extends ObjetVisible {
	timeout: number = null;
	constructor(posX: number, posY: number) {
		super(posX, posY);
		this.scale = 2;
		// autodestruction après animation;
		this.timeout = setTimeout(this.destructeur.bind(this), 1000 / 30 * 15);
		createjs.Sound.play("explosion");
	}

	protected dessiner(): void {
		window.lib.ClipExplosion.call(this);
		this.frameBounds = window.lib.ClipExplosion.prototype.frameBounds;
	}

	public destructeur(): void {
		clearTimeout(this.timeout);
		this.timeout = null;
		super.destructeur();
	}
}