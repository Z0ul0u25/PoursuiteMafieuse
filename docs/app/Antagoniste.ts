import { Dynamite } from "./Dynamite";
import { Voiture } from "./Voiture";
import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Antagoniste
 * @description Abstraite. Tout ce qu'un antagoniste à de besoin pour exister
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export abstract class Antagoniste extends Voiture {

	protected accelDelta: number;
	protected vitesseMax: number;
	protected vitesseX: number;
	protected vitesseY: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];

	/**
	 * Constrcteur d'Antagoniste
	 * @param posX Position en X sur la scene
	 * @param posY Position en Y sur la scene
	 */
	public constructor(posX: number, posY: number) {
		super(posX, posY);
		this.addEventListener("tick", this.faireBouger.bind(this), false);
	}

	/**
	 * Sera appeler par intervale pour faire bouger l'antagoniste
	 */
	protected abstract faireBouger(): void;

	/**
	 * Construit une nouvelle Dynamite
	 * @param deltaX Position en X par rapport à l'antagoniste
	 * @param deltaY Position en Y par rapport à l'antagoniste
	 * @returns Une Dynamite
	 */
	public lanceDynamite(deltaX:number, deltaY:number): Dynamite {
		return new Dynamite(this.x + deltaX, this.y+deltaY);
	}

	/**
	 * Détruit l'antagoniste l'orsqu'il n'est plus à l'écran si perdu
	 */
	private sortiDecran():void{
		if (this.y <= -128){ObjetVisible.refJeu.detruireAntagoniste(this);}
	}

	/**
	 * Gère le mouvement de l'antagoniste si le jeu est perdu
	 */
	public departDeFin():void{
		this.gotoAndStop(0);
		this.vitesseY = -5;
		this.addEventListener("tick", this.sortiDecran.bind(this), false);
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		super.destructeur();
	}
}