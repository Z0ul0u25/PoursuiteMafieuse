import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Wasabi
 * @description Deuxième Antagoniste du jeu
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Wasabi extends Antagoniste {

	protected pointVie: number;
	private sens:number = 1;

	/**
	 * Constructeur de Wasabi
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 */
	public constructor(posX: number, posY: number) {
		super(posX, posY);
		this.name = "Wasabi";

		this.accelDelta = 0.5;
		this.vitesseMax = 8;
		this.vitesseX = null;
		this.vitesseY = null;
		this.rotationRatio = 3;
		this.pointVie = 2;

		this.zoneLimite = [64, window.lib.properties.width - 188, window.lib.properties.height / 2 - 32, window.lib.properties.width / 2 + 96];
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipWasabi.call(this);
		this.frameBounds = window.lib.ClipWasabi.prototype.frameBounds;
	}

	/**
	 * Gestion du mouvement
	 */
	protected faireBouger(): void {

		if (this.pointVie > 0) {
			// Va faire des mouvement de gauche à droite
			if (this.sens == 1 && this.x >= this.zoneLimite[1]) {
				if (this.vitesseX > 0) {
					this.vitesseX -= this.accelDelta;
				} else {
					this.sens = -1;
				}
			} else if (this.sens == -1 && this.x <= this.zoneLimite[3]) {
				if (this.vitesseX > 0) {
					this.vitesseX -= this.accelDelta;
				} else {
					this.sens = 1;
				}
			} else if (this.vitesseX < this.vitesseMax) {
				this.vitesseX += this.accelDelta;
			}
		}

		this.x += this.vitesseX * this.sens;
		this.y += this.vitesseY;
		this.rotation = this.vitesseX * this.rotationRatio * this.sens;

		if (this.y > window.lib.properties.height + 128){
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		super.destructeur();
	}
}