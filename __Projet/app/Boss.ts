import { Antagoniste } from "./Antagoniste";
import { ObjetVisible } from "./ObjetVisible";
import { Ricardo } from "./Ricardo";

export class Boss extends Antagoniste {
	protected pointVie: number;
	private refRicardo: Ricardo;
	private sens: number = 1;
	private etat: string = "entree";

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
	}

	protected faireBouger(): void {
		console.log(this.x, this.y);
		switch (this.etat) {
			case "entree":
				this.vitesseY -= 0.05;
				if (this.y > this.zoneLimite[0]) {
					this.etat = "defaut"
					this.vitesseY = 0;
				}
				break;
			default:

				if (this.pointVie > 0) {
					if (this.sens == 1 && this.x >= this.zoneLimite[1]) {
						if (this.vitesseX > 0) {
							this.vitesseX -= this.accelDelta;
						} else {
							this.sens = -1;
						}
					} else if (this.sens == -1 && this.x <= this.zoneLimite[3]) {
						if (this.vitesseX > 0) {
							this.vitesseX -= this.accelDelta;
						} else {
							this.sens = 1;
						}
					} else if (this.vitesseX < this.vitesseMax) {
						this.vitesseX += this.accelDelta;
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
	}

	protected dessiner(): void {
		window.lib.ClipBoss.call(this);
		this.frameBounds = window.lib.ClipBoss.prototype.frameBounds;
	}
}