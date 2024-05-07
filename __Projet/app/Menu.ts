import { Jeu } from "./Jeu";
import { ObjetVisible } from "./ObjetVisible";

export class Menu extends ObjetVisible {

	constructor(refJeu:Jeu) {
		super(refJeu, 0, 0);
	}

	protected dessiner(): void {
		window.lib.ClipMenu.call(this);
		this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
	}

	public pageSuivante():void{
		this.gotoAndStop(1);
	}

	public detruire(): void {
		super.detruire();
	}
}