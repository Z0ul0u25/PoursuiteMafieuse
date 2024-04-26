import { ObjetVisible } from "./ObjetVisible";

export class Dynamite extends ObjetVisible {
	constructor(refScene: createjs.Stage, posX: number, posY: number) {
		super(refScene, posX, posY);
		this.addEventListener("tick", this.bouger.bind(this), false);
	}

	protected dessiner(): void {
		window.lib.ClipDynamite.call(this);
		this.frameBounds = window.lib.ClipDynamite.prototype.frameBounds;
	}

	public detruire(): void {
		this.removeAllEventListeners();
		super.detruire();
	}

	private bouger() {
		this.y += 20;
	}
}