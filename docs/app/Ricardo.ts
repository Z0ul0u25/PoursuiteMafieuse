import { AfficheurVie } from "./AfficheurVie";
import { Dynamite } from "./Dynamite";
import { Explosion } from "./Explosion";
import { ObjetVisible } from "./ObjetVisible";
import { Voiture } from "./Voiture";

/**
 * @class Ricardo
 * @description Personnage qui est controlé par le joueur
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Ricardo extends Voiture {
	protected accelDelta: number;
	protected vitesseMax: number;
	protected rotationRatio: number;
	protected zoneLimite: number[];
	protected pointVie: number;

	private refAfficheurVie: AfficheurVie = null;

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

	/**
	 * Constructeur de Ricardo
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 * @param refAfficheurVie Référence à l'objet AfficheurVie
	 */
	constructor(posX: number, posY: number, refAfficheurVie:AfficheurVie) {
		super(posX, posY);

		this.refAfficheurVie = refAfficheurVie;

		this.name = "Ricardo";
		this.pointVie = 4;

		this.accelDelta = 0.4;
		this.vitesseMax = 5;
		this.rotationRatio = 3;
		// [Haut, Droite, Bas, Gauche]
		this.zoneLimite = [window.lib.properties.height / 2, window.lib.properties.width - 32, window.lib.properties.height - 128, 32]
		// [W, D, S, A] (Haut, Droite, Bas, Gauche)
		this.touchesEnfoncees = [false, false, false, false];

		// Évenement au clavier
		window.onkeydown = this._activerTouche;
		window.onkeyup = this._desactiverTouche;

		this.addEventListener("tick", this.collisionDynamite.bind(this, ObjetVisible.refJeu.getDynamites()), false);
	}

	/**
	 * Sera redéfini dans toutes les sous classes selon le Clip
	 */
	protected dessiner(): void {
		window.lib.ClipRicardo.call(this);
		this.frameBounds = window.lib.ClipRicardo.prototype.frameBounds;
	}

	/**
	 * Gère les actions à faire sur activation d'une touche
	 * @param e KeyboardEvent pour bouger et tirer
	 */
	private activerTouche(e: KeyboardEvent): void {
		// Retrait en avance de toute frape au clavier pour ne pas
		// accidentellement faire une action qui sortirait du jeu
		e.preventDefault();
		switch (e.key) {
			case "ArrowUp":
			case "w":
				// Vers le haut
				this.touchesEnfoncees[0] = true;
				break;
			case "ArrowRight":
			case "d":
				// Vers la droite
				this.touchesEnfoncees[1] = true;
				break;
			case "ArrowDown":
			case "s":
				// Vers le bas
				this.touchesEnfoncees[2] = true;
				break;
			case "ArrowLeft":
			case "a":
				// Vers la gauche
				this.touchesEnfoncees[3] = true;
				break;
			case " ":
				/**
				 * Lancement de missile si:
				 * - Le timout de rechargement est passé
				 * - il n'y a pas de missile sur la scène
				 */
				if (this.timeoutMissile == null && ObjetVisible.refJeu.gestionMissile()) {
					this.gotoAndPlay("tir");
					this.timeoutMissile = setTimeout(this.apparitionMissile.bind(this), 1000 / 30 * 24);
				}
				break;
			// Aucune raison de faire un default
		}

		// gestion du mouvement 120 fois par seconde pour plus de précision.
		if (this.minuterieBouger == null) {
			this.minuterieBouger = window.setInterval(this._faireBouger, 1000 / 120);
		}

	}

	/**
	 * Gère les actions à faire au relachement d'une touche
	 * @param e KeyboardEvent pour bouger
	 */
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
				// Écrire les console log ici
				break;
			default:
				break;
		}
	}

	/**
	 * Gère le mouvement du personnage principal
	 */
	protected faireBouger(): void {
		// Se rappeler qu'une vitesse négative veut dire que l'on vas dans la direction opposé

		// Test vitesse en Y
		// Si l'on appuis sur (W, arrowUP) ou (S, arrowDown) de façon exclusive (Pas les deux en même temps)
		// && que la vitesse maximal n'est pas atteinte
		if ((this.touchesEnfoncees[0] != this.touchesEnfoncees[2]) && (Math.abs(this.vitesseY) < this.vitesseMax)) {
			// Vitesse augmente si on Appui sur "W", sinon vitesse diminue car "S"
			this.vitesseY += this.accelDelta * (this.touchesEnfoncees[2] ? 1 : -1);
		} else if (Math.abs(this.vitesseY) > this.accelDelta) {
			// Si on appuis sur aucune des deux touches la vitesse revient à 0
			this.vitesseY -= this.accelDelta * Math.sign(this.vitesseY);
		}

		// Test vitesse en X
		// Si l'on appuis sur (A, arrowLeft) ou (D, arrowRight) de façon exclusive (Pas les deux en même temps)
		// && que la vitesse maximal n'est pas atteinte
		if ((this.touchesEnfoncees[1] != this.touchesEnfoncees[3]) && (Math.abs(this.vitesseX) < this.vitesseMax)) {
			// Vitesse augmente si on Appui sur "D", sinon vitesse diminue car "A"
			this.vitesseX += this.accelDelta * (this.touchesEnfoncees[1] ? 1 : -1);
		} else if (Math.abs(this.vitesseX) > this.accelDelta) {
			// Si on appuis sur aucune des deux touches la vitesse revient à 0
			this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
		}

		// Changement dans la position Y si on est dan les limites
		if ((this.y + this.vitesseY > this.zoneLimite[0]) && (this.y + this.vitesseY < this.zoneLimite[2])) {
			this.y += this.vitesseY;
		} else {
			this.vitesseY = 0;
		}

		// Changement dans la position X si on est dan les limites
		if (this.x + this.vitesseX < this.zoneLimite[1] && this.x + this.vitesseX > this.zoneLimite[3]) {
			this.x += this.vitesseX;
		} else {
			this.vitesseX = 0;
		}

		// Rotation selon la vitesse en X
		this.rotation = this.vitesseX * this.rotationRatio;

		// Si la vitesse tombe en dessous du Delta d'acceleration
		if (Math.abs(this.vitesseX) < this.accelDelta && Math.abs(this.vitesseY) < this.accelDelta) {

			// Vérification si aucune touche n'est enfoncé
			let auMoinsUneToucheEnfoncee: boolean = false;
			for (const estDown of this.touchesEnfoncees) {
				if (estDown) {
					auMoinsUneToucheEnfoncee = true;
				}
			}

			// Clear l'interval seulement si aucune touche est enfoncé
			if (!auMoinsUneToucheEnfoncee) {
				window.clearInterval(this.minuterieBouger);
				this.minuterieBouger = null;
			}
		}
	}

	/**
	 * Gère ce equi à as faire lors de l'apparition d'un missile
	 */
	private apparitionMissile() {
		ObjetVisible.refJeu.gestionMissile(this.x, this.y);
		createjs.Sound.play("missile"+Math.round(Math.random()));
		clearTimeout(this.timeoutMissile);
		this.timeoutMissile = null;
	}

	/**
	 * Vérifie s'il y a collision avec une dynamite
	 * @param tDynamite Array de Dynamite
	 */
	private collisionDynamite(tDynamite: Dynamite[]): void {
		tDynamite.forEach(dynamite => {
			let point: createjs.Point = dynamite.parent.localToLocal(dynamite.x, dynamite.y, this);
			if (this.hitTest(point.x, point.y)) {
				new Explosion(dynamite.x, dynamite.y, true);
				this.jmeSuisFaitToucherPisCaFaitMal(1);
				dynamite.y = 1000;
				ObjetVisible.refJeu.detruireDynamite(dynamite, true);
			}
		});
	}

	/**
	 * Retrait de point de vie spécialement pour Ricardo
	 * @param degreDeViolenceRecu point de domage
	 */
	public override jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu: number): void {
		super.jmeSuisFaitToucherPisCaFaitMal(degreDeViolenceRecu);
		this.refAfficheurVie.maj(this.pointVie);
		if (this.pointVie <= 0) {
			ObjetVisible.refJeu.finDuJeuPerdu();
			this.removeAllEventListeners();
			window.onkeydown = null;
			window.onkeyup = null;
			clearInterval(this.minuterieBouger);
			this.minuterieBouger = null;
		}
	}

	/**
	 * Obtenir la position
	 * @returns Point de possition
	 */
	public getPos():createjs.Point{
		return new createjs.Point(this.x, this.y);
	}

	/**
	 * Obtenir la quantité de vie
	 * @returns nombre de point de vie
	 */
	public getVie():number{
		return this.pointVie;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {

		this._faireBouger = null;
		this._desactiverTouche = null;
		this._activerTouche = null;

		if (this.minuterieBouger != null) {
			window.clearInterval(this.minuterieBouger);
			this.minuterieBouger = null;
		}
		this.touchesEnfoncees = null;
		this.refAfficheurVie = null;
		this.timeoutMissile = null;

		window.onkeydown = null;
		window.onkeyup = null;

		super.destructeur();
	}
}