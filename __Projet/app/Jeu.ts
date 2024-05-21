import { Rue } from "./Rue";
import { Menu } from "./Menu";
import { Boss } from "./Boss";
import { Maki } from "./Maki";
import { Wasabi } from "./Wasabi";
import { Ricardo } from "./Ricardo";
import { Missile } from "./Missile";
import { Dynamite } from "./Dynamite";
import { Explosion } from "./Explosion";
import { Antagoniste } from "./Antagoniste";
import { AfficheurVie } from "./AfficheurVie";
import { AfficheurPts } from "./AfficheurPts";
import { ObjetVisible } from "./ObjetVisible";

/**
 * @class Jeu
 * @description Classe responsable de ce qui se passe dans le jeu
 * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
 */
export class Jeu {
	private refScene: createjs.Stage = null;
	private rue: Rue = null;
	private menu: Menu = null;
	private afficheurVie: AfficheurVie = null;
	private afficheurPts: AfficheurPts = null;

	private ricardo: Ricardo = null;
	private tAntagoniste: Antagoniste[] = [];

	private tDynamite: Dynamite[] = [];
	private missile: Missile = null;
	private tminDynamite: number[] = [];
	private pauseMinuteurDynmite: Boolean = null;

	private musique: createjs.Sound = null;

	private _gestionMissile = this.gestionMissile.bind(this);

	constructor(refScene: createjs.Stage) {
		// Applique la référence de jeu pour tout le monde
		ObjetVisible.refJeu = this;
		this.refScene = refScene;
		this.afficherMenu();
	}

	/**
	 * Appeler pour faire (re)commencer le jeu
	 */
	public debuter(): void {

		// Reset des sons s'il y en avait
		createjs.Sound.stop();

		/**
		 * Si la rue n'est pas à null, c'est que le jeu est en cour et est venu a bout.
		 * On réinitialise alors:
		 * - la Rue
		 * - Ricardo (joueur)
		 * - Les afficheur
		 * - Les antagonistes (s'il sont toujours présent sur la scène)
		 */
		if (this.rue != null) {
			this.rue.destructeur();
			this.ricardo.destructeur();
			this.afficheurVie.destructeur();
			this.afficheurPts.destructeur();
			while (this.tAntagoniste.length != 0) {
				this.tAntagoniste.pop().destructeur();
			}
		}

		this.rue = new Rue();
		this.afficheurVie = new AfficheurVie();

		this.ricardo = new Ricardo(window.lib.properties.width / 2, window.lib.properties.height - 128, this.afficheurVie);

		// Premier niveau donc les deux premier Antagoniste font leur entré en scène
		this.tAntagoniste.push(new Maki(window.lib.properties.width * 0.35, 150));
		this.tAntagoniste.push(new Wasabi(window.lib.properties.width * 0.65, 150));
		for (let i = 0; i < this.tAntagoniste.length; i++) {
			// Ajout d'une minuterie pour faire apparaitre des Dynamite sur
			// chaque Antagonistes comme s'il les faisaient apparaître
			this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 1000 + i * 200, this.tAntagoniste[i]));
		}

		this.pauseMinuteurDynmite = false;

		this.afficheurPts = new AfficheurPts();
		this.refScene.addChild(this.afficheurPts);

		// Musique du niveau 1 en boucle
		this.musique = createjs.Sound.play("musique_n1", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
	}

	/**
	 * Chargement du niveau 2
	 */
	private chargementNiveau2(): void {
		// Arrêt de la musique
		createjs.Sound.stop();
		// Assossiation de l'intro à la trame musicale du niveau 2
		this.musique = createjs.Sound.play("musique_n2_in", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.5 });
		// Quand la musique d'intro aura fini, début véritable du niveau
		this.musique.on("complete", this.debuterNiveau2.bind(this));
	}

	/**
	 * Début du niveau 2
	 */
	private debuterNiveau2(): void {
		// Remplacement de la musique pour la boucle de niveau 2
		this.musique = createjs.Sound.play("musique_n2_loop", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 })
		// Apparition du Boss et d'interval pour lancer la Dynamite
		this.tAntagoniste.push(new Boss(window.lib.properties.width / 2, -150, this.ricardo));
		this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], -20));
		this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], 20));
	}

	/**
	 * Affiche le menu dans l'état voulu
	 * @param etat État d'affichage du menu. Facultatif
	 */
	public afficherMenu(etat: string = ""): void {
		if (this.menu == null) {
			// Première fois que le jeu est lancé
			this.menu = new Menu();
		} else {
			// Change le menu de place avec d'autre élément de la scène affin d'être toujours rendu en face des autres
			this.menu.setVisibilite(true);
			this.refScene.swapChildren(this.menu, this.refScene.children[this.refScene.children.length - 3]);
			this.refScene.swapChildren(this.menu.getRefBouton(), this.refScene.children[this.refScene.children.length - 1])
			this.menu.gotoAndStop(etat);
		}

		if (etat == "gagne") {
			// Déplace le compteur de point sur le menu
			this.afficheurPts.x = 400;
			this.afficheurPts.y = 500;
			this.refScene.swapChildren(this.afficheurPts, this.refScene.children[this.refScene.children.length - 2]);
		} else {
			// Affiche simplement le menu
			this.refScene.swapChildren(this.afficheurPts, this.refScene.children[this.refScene.children.length - 3]);
		}
	}

	/**
	 * Gère les Dynamites sur le Jeu
	 * @param antagoniste Référence à un objet Antagoniste
	 * @param deltaX Position en X par rapport à l'Antagoniste
	 * @param deltaY Position en Y par rapport à l'Antagoniste
	 */
	private gestionDynamite(antagoniste: Antagoniste, deltaX: number = 0, deltaY: number = 0): void {
		if (this.refScene.tickEnabled && !this.pauseMinuteurDynmite) {
			// Ajout de la dynamite
			this.tDynamite.push(antagoniste.lanceDynamite(deltaX, deltaY));
			const nouvelleDynamite: Dynamite = this.tDynamite[this.tDynamite.length - 1];
			// Place les afficheurs et l'antagoniste devant la dynamite
			this.refScene.swapChildren(
				nouvelleDynamite,
				this.afficheurVie
			);
			this.refScene.swapChildren(
				nouvelleDynamite,
				this.afficheurPts
			);
			this.refScene.swapChildren(
				nouvelleDynamite,
				antagoniste,
			)

			/**
			 * Suppression de dynamite hors vu
			 * La suppression est géré ici pour ne pas avoir à faire une
			 * fonction supplémentaire simplement pour vérifier toutes les
			 * dynamites à tous les tics. Ce qui demanderait plus de
			 * temps de processeur.
			 */
			this.tDynamite.forEach(dynamite => {
				if (dynamite.y > window.lib.properties.height + 100) {
					this.detruireDynamite(dynamite, false);
				}
			});
		}
	}

	/**
	 * Detruit une Dynamite
	 * @param dynamite Objet Dynamite
	 * @param touche si elle touche à Ricardo
	 */
	public detruireDynamite(dynamite: Dynamite, touche: Boolean): void {
		// Si la dynamite à touché, -100 pts
		if (touche) { this.afficheurPts.majPointage(-100); }
		this.tDynamite.splice(this.tDynamite.indexOf(dynamite), 1);
		dynamite.destructeur();
	}

	/**
	 * Change l'état de pause pour les minuteur d'apparition de Dynamite
	 */
	public alternerPauseMinuteurDynamite(): void {
		this.pauseMinuteurDynmite = !this.pauseMinuteurDynmite;
	}

	/**
	 * Cache le compteur de point hors champ
	 */
	public cacherPts(): void {
		if (this.afficheurPts != null) {
			this.afficheurPts.x = 1200;
		}
	}

	/**
	 * Gestion du missile
	 * Un seul missile peut être en jeu à la fois sinon, ce serait trop facile
	 * de gagner au jeu
	 * @param posX Position en X du Missile
	 * @param posY Position en Y du Missile
	 * @returns Si la référence au Missile est null
	 */
	public gestionMissile(posX: number = -1, posY: number = -1): Boolean {
		// Si la position n'à pas été défini, il s'agit alors d'une
		// vérification à savoir s'il y a déjà un missile en jeu
		if (posX != -1) {
			if (this.missile == null) {
				// Aparition du missile
				this.missile = new Missile(this.ricardo.x + 12, this.ricardo.y - 83, this.ricardo.rotation);
				this.refScene.addEventListener("tick", this._gestionMissile, false);
			} else {
				// Vérification si le missile entre en contact avec un antagoniste
				let touche = false;
				this.tAntagoniste.forEach(antagoniste => {
					let point: createjs.Point = this.missile.parent.localToLocal(this.missile.x, this.missile.y, antagoniste);
					if (antagoniste.hitTest(point.x, point.y)) {
						new Explosion(this.missile.x, this.missile.y, false);
						antagoniste.jmeSuisFaitToucherPisCaFaitMal(1);
						touche = true;
					}
				});

				if (touche || this.missile.y < -100) {
					// Si le missile touche on donne 1000 pts
					// autrement on enlève 100 pts car La maison à une pauvre mamie au bout de la rue à explosé
					this.afficheurPts.majPointage((touche ? 1000 : -100));

					// Destruction du missile
					this.refScene.removeEventListener("tick", this._gestionMissile);
					this.missile.destructeur();
					this.missile = null;
				}
			}
		}
		return this.missile == null;
	}

	/**
	 * Gestion lorsque le jeu est perdu
	 */
	public finDuJeuPerdu(): void {
		// On retire toute les Dynamites
		while (this.tminDynamite.length != 0) {
			clearInterval(this.tminDynamite.pop());
		}
		// Stop la rue de bouger
		this.rue.arreterDefilement();
		// Envoi de message au Antagoniste pour quitter la scène
		for (let i = 0; i < this.tAntagoniste.length; i++) {
			this.tAntagoniste[i].departDeFin();
		}
		// Affichage du menu après 2 secondes
		setTimeout(this.afficherMenu.bind(this), 2000, "perdu");
	}

	/**
	 * Gestion lorsque le jeu est gagné
	 */
	public finDuJeuGagne(): void {
		this.afficherMenu("gagne");
		// Oui, même si tu gagne, on te détruit.
		// Sinon on pourrait faire apparaitre des missiles à travers le menu.
		this.ricardo.destructeur();
	}

	/**
	 * Gestion de destruction d'un Antagoniste
	 * @param unAntagoniste Référence d'un Antagoniste
	 */
	public detruireAntagoniste(unAntagoniste: Antagoniste): void {
		let isBoss = unAntagoniste.name == "Boss";
		if (!isBoss) {
			// L'Antagoniste et le minuteur de Dynamite partage le même index dans leur Array respectif
			clearInterval(this.tminDynamite[this.tAntagoniste.indexOf(unAntagoniste)]);
			this.tminDynamite.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);
		} else {
			// Au Niveau 2, tout les minuteurs de Dynamite stop
			for (let i = 0; i < this.tminDynamite.length; i++) {
				clearInterval(this.tminDynamite[i]);
			}
			this.tminDynamite = [];

			// Si Ricardo meurt après avoir tué le Boss, le jeu est quand même perdu
			if (this.ricardo.getVie() > 0) {
				this.finDuJeuGagne();
			} else {
				this.finDuJeuPerdu();
			}
		}

		this.tAntagoniste.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);

		unAntagoniste.destructeur();

		// Chargement du Niveau si aucun antagoniste dans le tableau.
		// Et que l'antagoniste détruit n'est pas le Boss... Et que Ricardo et vivant
		if (!isBoss && this.tAntagoniste.length == 0 && this.ricardo.getVie() > 0) {
			this.chargementNiveau2();
		}
	}

	/**
	 * Obtien le tableau de Dynamite
	 * @returns le tableau de Dynamite
	 */
	public getDynamites(): Dynamite[] {
		return this.tDynamite;
	}

	/**
	 * Obtien la scène
	 * @returns la Scène
	 */
	public getScene(): createjs.Stage {
		return this.refScene;
	}
}
