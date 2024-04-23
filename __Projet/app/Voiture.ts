import { ObjetVisible } from "./ObjetVisible";

export abstract class Voiture extends ObjetVisible{

	protected abstract accelDelta:number;
	protected abstract vitesseMax:number;
	protected abstract vitesseX:number;
	protected abstract vitesseY:number;
	protected abstract rotationRatio:number;


	public constructor(refScene: createjs.Stage, posX:number, posY:number) {
		super(refScene, posX, posY);

	}

	protected abstract faireBouger():void;

}