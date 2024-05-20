import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";
import { Ricardo } from "./Ricardo";

export class Boss extends Antagoniste {
	protected pointVie: number;
	private refRicardo: Ricardo;
	private sens: number = 1;
	private etat: string = "entree";
	private siTestCollisionActif = false;

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
				this.vitesseY -= 0.05;
				if (this.y > this.zoneLimite[0]) {
					this.play();
					this.etat = "defaut";
					this.vitesseY = 0;
				}
				break;
			case "freine":
				if (this.y < 600) {
					if (this.vitesseY < this.vitesseMax * 2) {
						this.vitesseY += this.accelDelta * 2;
					}
				} else {
					this.etat = "accel";
				}
				break;
			case "accel":
				if (this.y > 250) {
					if (this.vitesseY > -this.vitesseMax * 2) {
						this.vitesseY -= this.accelDelta * 1.4;
					}
				} else {
					this.etat = "defaut";
					this.play();
					ObjetVisible.refJeu.alternerPauseMinuteurDynamite();
				}
				break;
			case "mort":
			// géré dans le parent voiture.ts
			default:
				if (this.pointVie > 0) {
					if (this.x < this.refRicardo.x - 42 && this.vitesseX < this.vitesseMax) {
						this.vitesseX += this.accelDelta;
					} else if (this.x > this.refRicardo.x + 42 && this.vitesseX > this.vitesseMax * -1) {
						this.vitesseX -= this.accelDelta;
					} else if (this.vitesseX != 0) {
						this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
						if (this.vitesseX < this.accelDelta && this.vitesseX > this.accelDelta * -1) {
							this.vitesseX = 0;
							let ram = Math.random();
							// Chance de Ram par tic
							if (ram > 0.2) {
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

		this.x += this.vitesseX * this.sens;
		this.y += this.vitesseY;
		this.rotation = this.vitesseX * this.rotationRatio * this.sens;

		if (this.y > window.lib.properties.height + 128) {
			ObjetVisible.refJeu.detruireAntagoniste(this);
		}

		if (this.pointVie <= 0) {
			this.etat = "mort";
			this.removeEventListener("tick", this.testCollisionRicardo.bind(this));
			this.siTestCollisionActif = false;
		}
	}

	private testCollisionRicardo() {
		if (this.siTestCollisionActif && this.getTransformedBounds().intersects(this.refRicardo.getTransformedBounds())) {
			this.removeEventListener("tick", this.testCollisionRicardo.bind(this));
			this.siTestCollisionActif = false;
			this.vitesseY = 0;
			this.etat = "accel";

			this.refRicardo.jmeSuisFaitToucherPisCaFaitMal(0.5);
			createjs.Sound.play("collision", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.7 })
		}

		// return this.getBounds().intersects(this.refRicardo.getBounds());
	}

	protected dessiner(): void {
		window.lib.ClipBoss.call(this);
		this.frameBounds = window.lib.ClipBoss.prototype.frameBounds;
	}

	public destructeur(): void {
		this.refRicardo = null;
		this.etat = null;
		super.destructeur();
	}
}