import { Antagoniste } from "./Antagoniste";

export class Maki extends Antagoniste{
	protected pointVie: number;


	public constructor(refScene, posX, posY) {
		super(refScene, posX, posY);
		this.pointVie = 2;
		this.name = "Maki";
	}

	protected faireBouger(): void {
		if (this.pointVie <= 0){
			this.y+=20;
		}
		if (this.y >= window.lib.properties.height + 100) {
			super.detruire();
		}
	}
	protected dessiner(): void {
		window.lib.ClipMaki.call(this);
		this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
	}

}