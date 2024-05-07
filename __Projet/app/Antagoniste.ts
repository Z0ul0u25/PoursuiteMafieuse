import { Dynamite } from "./Dynamite";
import { Voiture } from "./Voiture";
import { Jeu } from "./Jeu";

export abstract class Antagoniste extends Voiture {
	protected accelDelta: number;
	protected vitesseMax: number;
	protected vitesseX: number;
	protected vitesseY: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];
	private refJeu:Jeu = null;

	private _faireBouger = this.faireBouger.bind(this);

	public constructor(refJeu:Jeu, posX: number, posY: number) {
		super(refJeu, posX, posY);
		this.refJeu = refJeu;
		this.addEventListener("tick", this._faireBouger, false);
	}

	protected abstract faireBouger(): void;

	public lanceDynamite(): Dynamite {
		return new Dynamite(this.refJeu, this.x, this.y);
	}

	private sortiDecran():void{
		this.y += this.vitesseY;
		if (this.y <= -128){this.detruire();}
	}

	public departDeFin():void{
		this.vitesseY = -5;
		this.addEventListener("tick", this.sortiDecran.bind(this), false);
	}

	public detruire(): void {
		this.removeAllEventListeners();
		super.detruire();
	}
}