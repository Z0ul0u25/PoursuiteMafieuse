import { Dynamite } from "./Dynamite";
import { Voiture } from "./Voiture";
import { ObjetVisible } from "./ObjetVisible";

export abstract class Antagoniste extends Voiture {
	protected accelDelta: number;
	protected vitesseMax: number;
	protected vitesseX: number;
	protected vitesseY: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];

	private _faireBouger = this.faireBouger.bind(this);

	public constructor(posX: number, posY: number) {
		super(posX, posY);
		this.addEventListener("tick", this._faireBouger, false);
	}

	protected abstract faireBouger(): void;

	public lanceDynamite(deltaX:number, deltaY:number): Dynamite {
		return new Dynamite(this.x + deltaX, this.y+deltaY);
	}

	private sortiDecran():void{
		if (this.y <= -128){ObjetVisible.refJeu.detruireAntagoniste(this);}
	}

	public departDeFin():void{
		this.gotoAndStop(0);
		this.vitesseY = -5;
		this.addEventListener("tick", this.sortiDecran.bind(this), false);
	}

	public detruire(): void {
		this.removeAllEventListeners();
		super.detruire();
	}
}