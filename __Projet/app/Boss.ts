import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";
import { Ricardo } from "./Ricardo";

/**
 * @class Boss
 * @description Le Boss du jeu (niveau 2)
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Boss extends Antagoniste {

	protected pointVie: number;
	private refRicardo: Ricardo;
	private sens: number = 1;
	private etat: string = "entree";
	private siTestCollisionActif = false;

	/**
	 * Constructeur de Boss
	 * @param posX Position en X sur la scène
	 * @param posY Position en Y sur la scène
	 * @param refRicardo Référence à l'objet Ricardo (joueur)
	 */
	constructor(posX: number, posY: number, refRicardo: Ricardo) {
		super(posX, posY);

		this.refRicardo = refRicardo;

		this.name = "Boss";
		this.pointVie = 6;
		this.accelDelta = 0.5;
		this.vitesseMax = 7;
		this.rotationRatio = 2;
		this.zoneLimite = [196, window.lib.properties.width - 188, window.lib.properties.height - 32, 188];
		this.vitesseY = 7;
		this.stop();
	}

	protected faireBouger(): void {
		switch (this.etat) {
			case "entree":
				// Entrée en scène depuis le haut de l'écran
				this.vitesseY -= 0.05;
				if (this.y > this.zoneLimite[0]) {
					this.play();
					this.etat = "defaut";
					this.vitesseY = 0;
				}
				break;
			case "freine":
				// Attaque au freinage
				if (this.y < 600) {
					if (this.vitesseY < this.vitesseMax * 2) {
						this.vitesseY += this.accelDelta * 2;
					}
				} else {
					this.etat = "accel";
				}
				break;
			case "accel":
				// Retour dans la zoneLimite
				if (this.y > 250) {
					if (this.vitesseY > -this.vitesseMax * 2) {
						this.vitesseY -= this.accelDelta * 1.4;
					}
				} else {
					// Retour à l'état par défaut
					this.etat = "defaut";
					this.play();
					ObjetVisible.refJeu.alternerPauseMinuteurDynamite();
				}
				break;
			case "mort":
			// géré dans le parent voiture.ts
			default:
				// Gestion du mouvement du Boss
				if (this.pointVie > 0 && this.refRicardo.getVie() > 0) {
					// Tant que lui et le joueur sont vivant, il esseyera de rester devant le joueur
					if (this.x < this.refRicardo.x - 42 && this.vitesseX < this.vitesseMax) {
						this.vitesseX += this.accelDelta;
					} else if (this.x > this.refRicardo.x + 42 && this.vitesseX > this.vitesseMax * -1) {
						this.vitesseX -= this.accelDelta;
					} else if (this.vitesseX != 0) {
						this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
						if (this.vitesseX < this.accelDelta && this.vitesseX > this.accelDelta * -1) {
							// Lorsque la vitesse en x sera proche de 0, celle ci est snapper à 0
							this.vitesseX = 0;

							// Chance aléatoire d'exécuté une attaque au freinage *Brake check*
							if (Math.random() > 0.2) {
								this.etat = "freine";
								ObjetVisible.refJeu.alternerPauseMinuteurDynamite();
								this.stop();
								this.vitesseX = 0;
								if (!this.siTestCollisionActif) {
									this.siTestCollisionActif = true;
									this.addEventListener("tick", this.testCollisionRicardo.bind(this), false);
								}
							}
						}
					}
					if (this.vitesseY < 0) {
						this.vitesseY += this.accelDelta * 3;
						if (this.vitesseY >= 0) {
							this.vitesseY = 0;
						}
					}
				}
				break;
		}

		// Après avoir fait tout les tests et ajustement précédent
		// Effectuation du mouvement
		this.x += this.vitesseX * this.sens;
		this.y += this.vitesseY;
		this.rotation = this.vitesseX * this.rotationRatio * this.sens;

		// Destruction si en dehors de la scène
		if (this.y > window.lib.properties.height + 128) {
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}

		// Envoi à l'état de mort quand la vie est à 0
		if (this.pointVie <= 0) {
			this.etat = "mort";
			this.removeEventListener("tick", this.testCollisionRicardo.bind(this));
			this.siTestCollisionActif = false;
		}
	}

	/**
	 * Vérification s'il est en collision avec Ricardo
	 */
	private testCollisionRicardo() {
		if (this.siTestCollisionActif && this.getTransformedBounds().intersects(this.refRicardo.getTransformedBounds())) {
			this.removeEventListener("tick", this.testCollisionRicardo.bind(this));
			this.siTestCollisionActif = false;
			this.vitesseY = 0;
			this.etat = "accel";

			this.refRicardo.jmeSuisFaitToucherPisCaFaitMal(0.5);
			createjs.Sound.play("collision", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.7 })
		}
	}

	/**
	 * Assigne le clip pour affichage visuel
	 */
	protected dessiner(): void {
		window.lib.ClipBoss.call(this);
		this.frameBounds = window.lib.ClipBoss.prototype.frameBounds;
	}

	/**
	 * Destructeur
	 */
	public destructeur(): void {
		this.refRicardo = null;
		this.etat = null;
		this.sens = null;
		this.siTestCollisionActif = null;
		super.destructeur();
	}
}