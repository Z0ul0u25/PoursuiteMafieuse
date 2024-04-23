import { Antagoniste } from "./Antagoniste";

export class Maki extends Antagoniste{


	public constructor(refScene, posX, posY) {
		super(refScene, posX, posY);

	}

	protected faireBouger(): void {

	}
	protected dessiner(): void {
		window.lib.ClipMaki.call(this);
		this.frameBounds = window.lib.ClipMaki.prototype.frameBounds;
	}

}