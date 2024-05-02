import { Antagoniste } from "./Antagoniste";

export class Wasabi extends Antagoniste {
	protected pointVie: number;
	private sens = 1;

	public constructor(refScene, posX, posY) {
		super(refScene, posX, posY);
		this.name = "Wasabi";

		this.accelDelta = 0.5;
		this.vitesseMax = 8;
		this.vitesseX = null;
		this.vitesseY = null;
		this.rotationRatio = 3;
		this.pointVie = 2;

		this.zoneLimite = [64, window.lib.properties.width - 188, window.lib.properties.height / 2 - 32, window.lib.properties.width / 2 + 96];
	}

	protected faireBouger(): void {
		if (this.pointVie <= 0) {
			this.y += 20;
		} else {
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

		this.x += this.vitesseX * this.sens;
		this.y += this.vitesseY;
		this.rotation = this.vitesseX * this.rotationRatio * this.sens;

		if (this.y >= window.lib.properties.height + 100) {
			super.detruire();
		}
	}

	protected dessiner(): void {
		window.lib.ClipWasabi.call(this);
		this.frameBounds = window.lib.ClipWasabi.prototype.frameBounds;
	}

}