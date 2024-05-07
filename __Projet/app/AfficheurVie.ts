import { ObjetVisible } from "./ObjetVisible";

export class AfficheurVie extends ObjetVisible {
	constructor(refScene: createjs.Stage) {
		super(refScene, 5, window.lib.properties.height - 69);
	}

	protected dessiner(): void {
		window.lib.ClipAfficheurVie.call(this);
		this.frameBounds = window.lib.ClipAfficheurVie.prototype.frameBounds;
	}

	public maj(pv: number): void {
		if (pv < 0){
			pv = 0;
		}
		this.gotoAndStop(Math.floor(8 - pv * 2));
	}

	public detruire(): void {
		super.detruire();
	}
}