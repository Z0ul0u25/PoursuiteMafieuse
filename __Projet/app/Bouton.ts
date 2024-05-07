import { Jeu } from "./Jeu";
import { ObjetVisible } from "./ObjetVisible";

export class Bouton extends ObjetVisible {
	private label = ["continuer", "lancer", "redemarrer"];

	constructor(refJeu:Jeu, posX: number, posY: number, indexLabel:number) {
		super(refJeu, posX, posY);
		this.setLabel(indexLabel);
	}

	protected dessiner(): void {
		window.lib.ClipBouton.call(this);
		this.frameBounds = window.lib.ClipBouton.prototype.frameBounds;
	}

	public setLabel(indexLable:number){
		this.gotoAndStop(this.label[indexLable]);
	}

	public detruire():void{
		super.detruire();
	}
}