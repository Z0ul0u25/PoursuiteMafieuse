import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Voiture
 * @description Abstraite. Tout ce que les voitures auront de besoin
 */
export abstract class Voiture extends ObjetVisible{

	protected abstract accelDelta:number;
	protected abstract vitesseMax:number;
	protected vitesseX:number;
	protected vitesseY:number;
	protected abstract rotationRatio:number;
	protected abstract zoneLimite:number[]; // [Haut, Droite, Bas, Gauche]
	protected abstract pointVie:number;

	/**
	 * Constructeur de Voiture
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 */
	public constructor(posX:number, posY:number) {
		super(posX, posY);
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	/**
	 * Fonction à redéfinir pour le mouvement à prendre en jeu
	 */
	protected abstract faireBouger():void;

	/**
	 * Fait perdre des points de vies
	 * @param degreDeViolenceRecu Nombre de domage reçu
	 */
	public jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu: number): void {
		this.pointVie -= degreDeViolenceRecu;
		if (this.pointVie <= 0) {
			this.gotoAndPlay("mort");
			if (this.name != "Ricardo" && this.name != "Boss"){
				this.alpha = 0.5;
			}
			this.vitesseY = 20;
			this.vitesseX = 0;
		}
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.accelDelta = null;
		this.vitesseMax = null;
		this.vitesseX = null;
		this.vitesseY = null;
		this.rotationRatio = null;
		this.zoneLimite = null;
		this.pointVie = null;
		super.destructeur();
	}
}