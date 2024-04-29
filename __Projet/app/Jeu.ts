import { Rue } from "./Rue";
import { Ricardo } from "./Ricardo";
import { Maki } from "./Maki";
import { Wasabi } from "./Wasabi";
import { Menu } from "./Menu";
import { Bouton } from "./Bouton";
import { Antagoniste } from "./Antagoniste";
import { Dynamite } from "./Dynamite";
import { Missile } from "./Missile";

export class Jeu {
	private refScene: createjs.Stage = null;
	private rue: Rue = null;
	private menu: Menu = null;
	private bouton: Bouton = null;

	private ricardo: Ricardo = null;
	private tAntagoniste: Antagoniste[] = [];

	private tDynamite: Dynamite[] = [];
	private missile: Missile = null;
	// private tminDynamite:number[] = [];

	private _gestionMissile = this.gestionMissile.bind(this);

	constructor(refScene: createjs.Stage) {
		this.refScene = refScene;
		this.afficherMenu();
	}

	public debuter(): void {
		this.rue = new Rue(this.refScene);
		this.ricardo = new Ricardo(this.refScene, this, window.lib.properties.width / 2, window.lib.properties.height - 60);
		this.tAntagoniste.push(new Maki(this.refScene, window.lib.properties.width * 0.35, 150));
		this.tAntagoniste.push(new Wasabi(this.refScene, window.lib.properties.width * 0.65, 150));
		for (let i = 0; i < this.tAntagoniste.length; i++) {
			window.setInterval(this.gestionDynamite.bind(this), 1000, this.tAntagoniste[i]);
		}
	}

	private afficherMenu(): void {
		this.menu = new Menu(this.refScene);
		this.bouton = new Bouton(this.refScene, 300, 666, 0);
		this.bouton.addEventListener("click", this.menuPageSuivante.bind(this), false);
	}

	private menuPageSuivante(): void {
		if (this.menu.currentFrame == 0) {
			this.menu.pageSuivante();
			this.bouton.setLabel(1);
		} else {
			this.menu.detruire();
			this.bouton.detruire();
			this.debuter();
		}
	}

	private gestionDynamite(antagoniste: Antagoniste): void {
		// Ajout de la dynamite
		this.tDynamite.push(antagoniste.lanceDynamite());

		// Suppression de dynamite hors vu
		this.tDynamite.forEach(dynamite => {
			if (dynamite.y > window.lib.properties.height + 100) {
				dynamite.detruire();
				this.tDynamite.splice(this.tDynamite.indexOf(dynamite), 1);
			}
		});
	}

	public gestionMissile(posX: number = -1, posY: number = -1): Boolean {
		if (posX != -1) {
			if (this.missile == null) {
				this.missile = new Missile(this.refScene, this.ricardo.x + 12, this.ricardo.y - 83);
				this.refScene.addEventListener("tick", this._gestionMissile, false);
			}
			this.missile.y -= 5;
			if (this.missile.y < -100) {
				this.refScene.removeEventListener("tick", this._gestionMissile);
				this.missile.detruire();
				this.missile = null;
			}
		}
		return this.missile == null;
	}
}
