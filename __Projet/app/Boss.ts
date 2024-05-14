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
		this.stop();
	}

	protected faireBouger(): void {
		switch (this.etat) {
			case "entree":
				this.vitesseY -= 0.05;
				if (this.y > this.zoneLimite[0]) {
					this.play();
					this.etat = "defaut"
					this.vitesseY = 0;
				}
				break;
			default:
				if (this.pointVie > 0) {
					if (this.x < this.refRicardo.x - 42 && this.vitesseX < this.vitesseMax) {
						this.vitesseX += this.accelDelta;
					} else if (this.x > this.refRicardo.x + 42 && this.vitesseX > this.vitesseMax*-1) {
						this.vitesseX -= this.accelDelta;
					} else if (this.vitesseX != 0) {
						this.vitesseX -= this.accelDelta * Math.sign(this.vitesseX);
						if (this.vitesseX < this.accelDelta && this.vitesseX > this.accelDelta*-1){
							this.vitesseX = 0;
							let ram = Math.random();
							console.log(ram > 0.9);
							if(ram > 0.9){
								console.log("time to ram");
							}
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
	}

	protected dessiner(): void {
		window.lib.ClipBoss.call(this);
		this.frameBounds = window.lib.ClipBoss.prototype.frameBounds;
	}
}