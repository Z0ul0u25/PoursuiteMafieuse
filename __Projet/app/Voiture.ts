import { ObjetVisible } from "./ObjetVisible";

export abstract class Voiture extends ObjetVisible{

	protected abstract accelDelta:number;
	protected abstract vitesseMax:number;
	protected vitesseX:number;
	protected vitesseY:number;
	protected abstract rotationRatio:number;
	protected abstract zoneLimite:number[]; // [Haut, Droite, Bas, Gauche]
	protected abstract pointVie:number;


	public constructor(posX:number, posY:number) {
		super(posX, posY);
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	protected abstract faireBouger():void;

	public jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu: number): void {
		this.pointVie -= degreDeViolenceRecu;
		if (this.pointVie <= 0) {
			this.gotoAndPlay("mort");
			this.vitesseY = 20;
			this.vitesseX = 0;
		}
	}

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