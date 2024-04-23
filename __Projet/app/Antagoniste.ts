import { Voiture } from "./Voiture";

export abstract class Antagoniste extends Voiture{
	protected accelDelta: number;
	protected vitesseMax: number;
	protected vitesseX: number;
	protected vitesseY: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];

	public constructor(refScene:createjs.Stage, posX:number, posY:number){
		super(refScene, posX, posY);
	}

	protected abstract faireBouger(): void;
}