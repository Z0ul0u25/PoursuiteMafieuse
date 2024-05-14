import { AfficheurVie } from "./AfficheurVie";
import { Dynamite } from "./Dynamite";
import { Explosion } from "./Explosion";
import { ObjetVisible } from "./ObjetVisible";
import { Voiture } from "./Voiture";

export class Ricardo extends Voiture {
	protected accelDelta: number;
	protected vitesseMax: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];
	protected pointVie: number;

	private refAfficheurVie = null;

	private minuterieBouger: number = null;
	private touchesEnfoncees: Array<boolean> = null;
	private timeoutMissile: any = null;
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

	constructor(posX: number, posY: number, refAfficheurVie:AfficheurVie) {
		super(posX, posY);

		this.refAfficheurVie = refAfficheurVie;

		this.name = "Ricardo";
		this.pointVie = 4;

		this.accelDelta = 0.4;
		this.vitesseMax = 5;
		this.rotationRatio = 3;
		// Haut, Droite, Bas, Gauche
		this.zoneLimite = [window.lib.properties.height / 2, window.lib.properties.width - 32, window.lib.properties.height - 128, 32]
		this.touchesEnfoncees = [false, false, false, false];

		window.onkeydown = this._activerTouche;
		window.onkeyup = this._desactiverTouche;

		this.addEventListener("tick", this.collisionDynamite.bind(this, ObjetVisible.refJeu.getDynamites()), false);
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
			case " ":
				if (this.timeoutMissile == null && ObjetVisible.refJeu.gestionMissile()) {
					this.gotoAndPlay("tir");
					this.timeoutMissile = setTimeout(this.apparitionMissile.bind(this), 1000 / 30 * 24);
				}
				break;
			// Aucune raison de faire un default
		}

		if (this.minuterieBouger == null) {
			this.minuterieBouger = window.setInterval(this._faireBouger, 1000 / 120);
		}

	}

	private desactiverTouche(e: KeyboardEvent): void {
		e.preventDefault();
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

			case "p": //Debug Key
				console.log("DEBUG STATUS \n======");
				this.gotoAndPlay("mort");
				break;
			default:
				break;
		}
	}

	protected faireBouger(): void {

		if ((this.touchesEnfoncees[0] != this.touchesEnfoncees[2]) && (Math.abs(this.vitesseY) < this.vitesseMax)) {
			this.vitesseY += this.accelDelta * (this.touchesEnfoncees[2] ? 1 : -1);
		} else if (Math.abs(this.vitesseY) > this.accelDelta) {
			this.vitesseY -= this.accelDelta * Math.sign(this.vitesseY);
		}

		if ((this.touchesEnfoncees[1] != this.touchesEnfoncees[3]) && (Math.abs(this.vitesseX) < this.vitesseMax)) {
			this.vitesseX += this.accelDelta * (this.touchesEnfoncees[1] ? 1 : -1);
		} else if (Math.abs(this.vitesseX) > this.accelDelta) {
			this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
		}
		if ((this.y + this.vitesseY > this.zoneLimite[0]) && (this.y + this.vitesseY < this.zoneLimite[2])) {
			this.y += this.vitesseY;
		} else {
			this.vitesseY = 0;
		}

		if (this.x + this.vitesseX < this.zoneLimite[1] && this.x + this.vitesseX > this.zoneLimite[3]) {
			this.x += this.vitesseX;
		} else {
			this.vitesseX = 0;
		}

		this.rotation = this.vitesseX * this.rotationRatio;

		if (Math.abs(this.vitesseX) < this.accelDelta && Math.abs(this.vitesseY) < this.accelDelta) {

			let auMoinsUneToucheEnfoncee: boolean = false;
			for (const estDown of this.touchesEnfoncees) {
				if (estDown) {
					auMoinsUneToucheEnfoncee = true;
				}
			}

			if (!auMoinsUneToucheEnfoncee) {
				window.clearInterval(this.minuterieBouger);
				this.minuterieBouger = null;
			}
		}
	}

	private apparitionMissile() {
		ObjetVisible.refJeu.gestionMissile(this.x, this.y);
		createjs.Sound.play("missile"+Math.round(Math.random()));
		clearTimeout(this.timeoutMissile);
		this.timeoutMissile = null;
	}

	private collisionDynamite(tDynamite: Dynamite[]): void {
		tDynamite.forEach(dynamite => {
			let point: createjs.Point = dynamite.parent.localToLocal(dynamite.x, dynamite.y, this);
			if (this.hitTest(point.x, point.y)) {
				new Explosion(dynamite.x, dynamite.y);
				this.jmeSuisFaitToucherPisCaFaitMal(1);
				dynamite.y = 1000;
			}
		});
	}

	public jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu: number): void {
		super.jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu);
		this.refAfficheurVie.maj(this.pointVie);
		if (this.pointVie <= 0) {
			ObjetVisible.refJeu.finDuJeu();
			this.removeAllEventListeners();
			window.onkeydown = null;
			window.onkeyup = null;
			clearInterval(this.minuterieBouger);
			this.minuterieBouger = null;
		}
	}

	public getPos():createjs.Point{
		return new createjs.Point(this.x, this.y);
	}

	public getVie():number{
		return this.pointVie;
	}

	public detruire(): void {
		this._faireBouger = null;
		this._desactiverTouche = null;
		this._activerTouche = null;

		if (this.minuterieBouger != null) {
			window.clearInterval(this.minuterieBouger);
			this.minuterieBouger = null;
		}
		this.touchesEnfoncees = null;

		window.onkeydown = null;
		window.onkeyup = null;

		super.detruire();
	}
}