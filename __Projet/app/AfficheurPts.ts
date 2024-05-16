import { ObjetVisible } from "./ObjetVisible";

export class AfficheurPts extends createjs.Text {

	fond:createjs.Shape = null;

	constructor() {
		super("0 pts", "32px komika", "#fb6431");

		this.x = 580;
		this.y = 750;
		this.textAlign = "right";

		this.fond = new createjs.Shape();
		this.fond.graphics.beginFill("#000000").drawRect(200, 950, 400, 200);
		this.fond.regX = 200;
		this.fond.regY = 100;
		this.fond.alpha = 0.5;
		this.fond.rotation = -20;
		ObjetVisible.refJeu.getScene().addChild(this.fond);
	}

	public majPointage(valeur: number): void {
		this.text = String(parseInt(this.text.split(" ")[0]) + valeur)+ " pts";
	}

	public destructeur() {
		ObjetVisible.refJeu.getScene().removeChild(this);
	}
}