import { ObjetVisible } from "./ObjetVisible";

export abstract class Voiture extends ObjetVisible{

	protected abstract accelDelta:number;
	protected abstract vitesseMax:number;
	protected vitesseX:number;
	protected vitesseY:number;
	protected abstract rotationRatio:number;
	protected abstract zoneLimite:number[];
	protected abstract pointVie:number;


	public constructor(refScene: createjs.Stage, posX:number, posY:number) {
		super(refScene, posX, posY);
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	protected abstract faireBouger():void;

	public jmeSuisFaitToucherPisCaFaitMal(degrerDeViolenceRecu: number): void {
		this.pointVie -= degrerDeViolenceRecu;
		if (this.pointVie <= 0) {
			this.gotoAndPlay("mort");
		}
	}

	public detruire(): void {
		this.accelDelta = null;
		this.vitesseMax = null;
		this.vitesseX = null;
		this.vitesseY = null;
		this.rotationRatio = null;
		this.zoneLimite = null;
		this.pointVie = null;
		super.detruire();
	}
}