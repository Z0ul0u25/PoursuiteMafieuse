import { ObjetVisible } from "./ObjetVisible";

/**
 * @class AfficheurPts
 * @description Affiche le pointage à l'écran
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class AfficheurPts extends createjs.Text {

	fond:createjs.Shape = null;

	/**
	 * Constructeur d'AfficheurPts
	 */
	constructor() {
		super("0 pts", "32px komika", "#fb6431");

		this.x = 580;
		this.y = 750;
		this.textAlign = "right";

		// Création de la forme en fond
		this.fond = new createjs.Shape();
		this.fond.graphics.beginFill("#000000").drawRect(200, 950, 400, 200);
		this.fond.regX = 200;
		this.fond.regY = 100;
		this.fond.alpha = 0.5;
		this.fond.rotation = -20;

		// Ajout de la forme au jeu
		ObjetVisible.refJeu.getScene().addChild(this.fond);
	}

	/**
	 * Met à jour le pointage
	 * @param valeur Pointage à ajouter
	 */
	public majPointage(valeur: number): void {
		this.text = String(parseInt(this.text.split(" ")[0]) + valeur)+ " pts";
	}

	/**
	 * Destructeur de l'objet
	 */
	public destructeur() {
		ObjetVisible.refJeu.getScene().removeChild(this);
	}
}