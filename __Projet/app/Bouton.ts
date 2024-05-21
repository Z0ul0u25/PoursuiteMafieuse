import { ObjetVisible } from "./ObjetVisible";

export class Bouton extends ObjetVisible {
	private label = ["continuer", "lancer", "redemarrer"];

	constructor(posX: number, posY: number, indexLabel: number) {
		super(posX, posY);
		this.setLabel(indexLabel);
	}

	protected dessiner(): void {
		window.lib.ClipBouton.call(this);
		this.frameBounds = window.lib.ClipBouton.prototype.frameBounds;
	}

	public setLabel(indexLable: number): void {
		this.gotoAndStop(this.label[indexLable]);
	}

	public destructeur(): void {
		this.label = null;
		super.destructeur();
	}
}