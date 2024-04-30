import { Dynamite } from "./Dynamite";
import { Voiture } from "./Voiture";

export abstract class Antagoniste extends Voiture {
	protected accelDelta: number;
	protected vitesseMax: number;
	protected vitesseX: number;
	protected vitesseY: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];
	private refScene: createjs.Stage = null;

	private _faireBouger = this.faireBouger.bind(this);

	public constructor(refScene: createjs.Stage, posX: number, posY: number) {
		super(refScene, posX, posY);
		this.refScene = refScene;

		this.addEventListener("tick", this._faireBouger, false);
	}

	protected abstract faireBouger(): void;

	public lanceDynamite(): Dynamite {
		return new Dynamite(this.refScene, this.x, this.y);
	}

	public detruire(): void {
		this.removeAllEventListeners();
		super.detruire();
	}
}