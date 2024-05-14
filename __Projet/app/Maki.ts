import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";

export class Maki extends Antagoniste{
	protected pointVie: number;


	public constructor(posX:number, posY:number) {
		super(posX, posY);
		this.pointVie = 2;
		this.name = "Maki";
	}

	protected faireBouger(): void {
		this.y += this.vitesseY;

		if (this.y > window.lib.properties.height + 128){
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}
	}
	protected dessiner(): void {
		window.lib.ClipMaki.call(this);
		this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
	}

	public destructeur(): void {
		super.destructeur();
	}

}