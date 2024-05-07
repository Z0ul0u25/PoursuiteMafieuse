import { Antagoniste } from "./Antagoniste";
import { Jeu } from "./Jeu";
import { ObjetVisible } from "./ObjetVisible";

export class Maki extends Antagoniste{
	protected pointVie: number;


	public constructor(refJeu:Jeu, posX:number, posY:number) {
		super(refJeu, posX, posY);
		this.pointVie = 2;
		this.name = "Maki";
	}

	protected faireBouger(): void {
		if (this.pointVie <= 0){
			this.y += this.vitesseY;
		}
		if (this.y >= window.lib.properties.height + 128) {
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}
	}
	protected dessiner(): void {
		window.lib.ClipMaki.call(this);
		this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
	}

}