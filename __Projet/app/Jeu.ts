import { Rue } from "./Rue";
import { Ricardo } from "./Ricardo";
import { Maki } from "./Maki";
import { Wasabi } from "./Wasabi";
import { Menu } from "./Menu";
import { Antagoniste } from "./Antagoniste";
import { Dynamite } from "./Dynamite";
import { Missile } from "./Missile";
import { Explosion } from "./Explosion";
import { AfficheurVie } from "./AfficheurVie";
import { ObjetVisible } from "./ObjetVisible";
import { Boss } from "./Boss";

export class Jeu {
	private refScene: createjs.Stage = null;
	private rue: Rue = null;
	private menu: Menu = null;
	private afficheurVie: AfficheurVie = null;

	private ricardo: Ricardo = null;
	private tAntagoniste: Antagoniste[] = [];

	private tDynamite: Dynamite[] = [];
	private missile: Missile = null;
	private tminDynamite: number[] = [];

	public musique: createjs.Sound = null;

	private _gestionMissile = this.gestionMissile.bind(this);

	constructor(refScene: createjs.Stage) {
		ObjetVisible.refJeu = this;
		this.refScene = refScene;
		this.afficherMenu();
	}

	public debuter(): void {

		createjs.Sound.stop();

		if (this.rue != null) {
			this.rue.destructeur();
			this.afficheurVie.destructeur();
			this.ricardo.destructeur();
			this.tAntagoniste.forEach(antagoniste => {
				antagoniste.destructeur();
			});
		}
		this.rue = new Rue();
		this.afficheurVie = new AfficheurVie();

		this.ricardo = new Ricardo(window.lib.properties.width / 2, window.lib.properties.height - 128, this.afficheurVie);

		this.tAntagoniste.push(new Maki(window.lib.properties.width * 0.35, 150));
		this.tAntagoniste.push(new Wasabi(window.lib.properties.width * 0.65, 150));
		for (let i = 0; i < this.tAntagoniste.length; i++) {
			this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 1000 + i * 200, this.tAntagoniste[i]));
		}

		this.musique = createjs.Sound.play("musique_n1", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
	}

	private chargementNiveau2(): void {
		createjs.Sound.stop();
		this.musique = createjs.Sound.play("musique_n2_in", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.5 });
		this.musique.on("complete", this.debuterNiveau2.bind(this));
	}

	private debuterNiveau2(): void {
		this.musique = createjs.Sound.play("musique_n2_loop", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 })
		console.log("NIVEAU 2");
		this.tAntagoniste.push(new Boss(window.lib.properties.width / 2, -150, this.ricardo));
		this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], -20));
		this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], 20));
	}

	public afficherMenu(etat: string = ""): void {
		if (this.menu == null) {
			this.menu = new Menu();
		} else {
			this.refScene.swapChildren(this.menu, this.refScene.children[this.refScene.children.length - 2]);
			this.refScene.swapChildren(this.menu.getRefBouton(), this.refScene.children[this.refScene.children.length - 1])
			this.menu.setVisibilite(true);
			this.menu.gotoAndStop(etat);
		}
	}


	private gestionDynamite(antagoniste: Antagoniste, deltaX: number = 0, deltaY: number = 0): void {
		if (this.refScene.tickEnabled) {
			// Ajout de la dynamite
			this.tDynamite.push(antagoniste.lanceDynamite(deltaX, deltaY));

			// Suppression de dynamite hors vu
			this.tDynamite.forEach(dynamite => {
				if (dynamite.y > window.lib.properties.height + 100) {
					dynamite.destructeur();
					this.tDynamite.splice(this.tDynamite.indexOf(dynamite), 1);
				}
			});
		}
	}

	public gestionMissile(posX: number = -1, posY: number = -1): Boolean {
		if (posX != -1) {
			if (this.missile == null) {
				this.missile = new Missile(this.ricardo.x + 12, this.ricardo.y - 83, this.ricardo.rotation);
				this.refScene.addEventListener("tick", this._gestionMissile, false);
			} else {
				this.tAntagoniste.forEach(antagoniste => {
					let point: createjs.Point = this.missile.parent.localToLocal(this.missile.x, this.missile.y, antagoniste);
					if (antagoniste.hitTest(point.x, point.y)) {
						new Explosion(this.missile.x, this.missile.y);
						antagoniste.jmeSuisFaitToucherPisCaFaitMal(1);
						this.missile.y = -200
					}
				});
			}
			if (this.missile.y < -100) {
				this.refScene.removeEventListener("tick", this._gestionMissile);
				this.missile.destructeur();
				this.missile = null;
			}
		}
		return this.missile == null;
	}

	public finDuJeu(): void {
		for (let i = 0; i < this.tminDynamite.length; i++) {
			clearInterval(this.tminDynamite[i]);
		}

		this.rue.arreterDefilement();

		for (let i = 0; i < this.tAntagoniste.length; i++) {
			this.tAntagoniste[i].departDeFin();
		}
	}

	public detruireAntagoniste(unAntagoniste: Antagoniste): void {
		let isBoss = unAntagoniste.name == "Boss";
		if (!isBoss) {
			clearInterval(this.tminDynamite[this.tAntagoniste.indexOf(unAntagoniste)]);
			this.tminDynamite.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);
		} else {
			for (let i = 0; i < this.tminDynamite.length; i++) {
				clearInterval(this.tminDynamite[i]);
			}
			this.tminDynamite = [];
			if (this.ricardo.getVie() > 0) {
				this.afficherMenu("gagne");
			}
		}

		this.tAntagoniste.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);

		unAntagoniste.destructeur();
		if (!isBoss && this.tAntagoniste.length == 0 && this.ricardo.getVie() > 0) {
			this.chargementNiveau2();
		}
	}

	public getDynamites(): Dynamite[] {
		return this.tDynamite;
	}

	public getScene(): createjs.Stage {
		return this.refScene;
	}
}
