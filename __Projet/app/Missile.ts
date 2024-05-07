import { Jeu } from "./Jeu";
import { ObjetVisible } from "./ObjetVisible";

export class Missile extends ObjetVisible {
	vitesse: number = null;

	constructor(refJeu:Jeu, posX: number, posY: number, rotation:number) {
		super(refJeu, posX, posY);
		this.vitesse = 3;
		this.rotation = rotation;

		this.addEventListener("tick", this.bouger.bind(this), false);
	}

	protected dessiner(): void {
		window.lib.ClipMissile.call(this);
		this.frameBounds = window.lib.ClipMissile.prototype.frameBounds;
	}

	private bouger(): void {
		this.y -= Math.cos(this.rotation*(Math.PI/180))* (this.vitesse += 2);
		this.x += Math.sin(this.rotation*(Math.PI/180))* this.vitesse;
	}

	public detruire(): void {
		this.removeAllEventListeners();
		this.vitesse = null;
		super.detruire();
	}
}