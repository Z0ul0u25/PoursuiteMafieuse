import { Voiture } from "./Voiture";

export class Ricardo extends Voiture {

	protected accelDelta: number = null;
	protected vitesseMax: number = null;
	protected vitesseX: number = null;
	protected vitesseY: number = null;
	protected rotationRatio: number = null;

	private minuterieBouger: number = null;
	private touchesEnfoncees: Array<boolean> = null;
	/*
	[0] = haut
	[1] = droite
	[2] = bas
	[3] = gauche
	*/

	//Binding
	private _activerTouche = this.activerTouche.bind(this);
	private _desactiverTouche = this.desactiverTouche.bind(this);
	private _faireBouger = this.faireBouger.bind(this);

	constructor(refScene: createjs.Stage, posX: number, posY: number) {
		super(refScene, posX, posY);
		this.accelDelta = 0.4;
		this.vitesseMax = 6;
		this.vitesseX = 0;
		this.vitesseY = 0;
		this.rotationRatio = 3;
		this.touchesEnfoncees = [false, false, false, false];

		window.onkeydown = this._activerTouche;
		window.onkeyup = this._desactiverTouche;
	}

	protected dessiner(): void {
		window.lib.ClipRicardo.call(this);
		this.frameBounds = window.lib.ClipRicardo.prototype.frameBounds;
	}

	private activerTouche(e: KeyboardEvent): void {
		e.preventDefault();
		switch (e.key) {
			case "ArrowUp":
			case "w":
				this.touchesEnfoncees[0] = true;
				break;
			case "ArrowRight":
			case "d":
				this.touchesEnfoncees[1] = true;
				break;
			case "ArrowDown":
			case "s":
				this.touchesEnfoncees[2] = true;
				break;
			case "ArrowLeft":
			case "a":
				this.touchesEnfoncees[3] = true;
				break;
			// Aucune raison de faire un default
		}

		if (this.minuterieBouger == null) {
			this.minuterieBouger = window.setInterval(this._faireBouger, 1000 / 60);
		}

	}

	private desactiverTouche(e: KeyboardEvent): void {
		e.preventDefault();
		let iniTouchesEnfoncees = this.touchesEnfoncees.slice();
		switch (e.key) {
			case "ArrowUp":
			case "w":
				this.touchesEnfoncees[0] = false;
				break;
			case "ArrowRight":
			case "d":
				this.touchesEnfoncees[1] = false;
				break;
			case "ArrowDown":
			case "s":
				this.touchesEnfoncees[2] = false;
				break;
			case "ArrowLeft":
			case "a":
				this.touchesEnfoncees[3] = false;
				break;

			default:
				break;
		}
	}

	protected faireBouger(): void {

		if ((this.touchesEnfoncees[0] != this.touchesEnfoncees[2]) && (Math.abs(this.vitesseY) < this.vitesseMax)) {
			this.vitesseY += this.accelDelta * (this.touchesEnfoncees[2] ? 1 : -1);
		} else if (this.touchesEnfoncees[0] == this.touchesEnfoncees[2]) {
			this.vitesseY -= this.accelDelta * Math.sign(this.vitesseY);
		}

		if ((this.touchesEnfoncees[1] != this.touchesEnfoncees[3]) && (Math.abs(this.vitesseX) < this.vitesseMax)) {
			this.vitesseX += this.accelDelta * (this.touchesEnfoncees[1] ? 1 : -1);
		} else if(this.touchesEnfoncees[1] == this.touchesEnfoncees[3]) {
			this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
		}

		if ((this.y + this.vitesseY > window.lib.properties.height / 2) && (this.y + this.vitesseY < window.lib.properties.height - 50)) {
			this.y += this.vitesseY;
		} else {
			this.vitesseY = 0;
		}

		if (this.x + this.vitesseX < window.lib.properties.width - 32 && this.x + this.vitesseX > 32) {
			this.x += this.vitesseX;
		} else {
			this.vitesseX = 0;
		}

		if (Math.abs(this.vitesseX) < this.accelDelta && Math.abs(this.vitesseY) < this.accelDelta) {
			this.vitesseX = 0;
			this.vitesseY = 0;

			let auMoinsUneToucheEnfoncee: boolean = false;
			for (const estDown in this.touchesEnfoncees) {
				if (estDown) {
					auMoinsUneToucheEnfoncee = true;
				}
			}

			if (!auMoinsUneToucheEnfoncee) {
				window.clearInterval(this.minuterieBouger);
				this.minuterieBouger = null;
			}
		}

		this.rotation = this.vitesseX * this.rotationRatio;
	}

	public detruire(): void {
		this._faireBouger = null;
		this._desactiverTouche = null;
		this._activerTouche = null;

		if (this.minuterieBouger != null) {
			window.clearInterval(this.minuterieBouger);
			this.minuterieBouger = null;
		}
		this.vitesse = null;
		this.touchesEnfoncees = null;

		window.onkeydown = null;
		window.onkeyup = null;

		super.detruire();
	}
}