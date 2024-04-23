import { ObjetVisible } from "./ObjetVisible";

export abstract class Voiture extends ObjetVisible{

	protected accelDelta:number = null;
	protected vitesseMax:number = null;
	protected vitesseX:number = null;
	protected vitesseY:number = null;
	protected rotationRatio:number = null;
	protected zoneLimite:number[] = null;


	public constructor(refScene: createjs.Stage, posX:number, posY:number) {
		super(refScene, posX, posY);
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	protected abstract faireBouger():void;

}