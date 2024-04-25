import { Rue } from "./Rue";
import { Ricardo } from "./Ricardo";
import { Maki } from "./Maki";
import { Wasabi } from "./Wasabi";
import { Menu } from "./Menu";
import { Bouton } from "./Bouton";
import { Antagoniste } from "./Antagoniste";

export class Jeu{
	private refScene:createjs.Stage = null;
	private ricardo:Ricardo=null;
	private tAntagoniste:Antagoniste[] = [];
	private rue:Rue=null;
	private menu:Menu=null;
	private bouton:Bouton=null;

	constructor(refScene:createjs.Stage) {
		this.refScene = refScene;
		this.afficherMenu();
	}

	public debuter():void{
		this.rue = new Rue(this.refScene);
		this.ricardo = new Ricardo(this.refScene, window.lib.properties.width/2, window.lib.properties.height-60);
		this.tAntagoniste.push(new Maki(this.refScene, window.lib.properties.width*0.35, 150));
		this.tAntagoniste.push(new Wasabi(this.refScene, window.lib.properties.width*0.65, 150));
	}

	private afficherMenu():void{
		this.menu = new Menu(this.refScene);
		this.bouton = new Bouton(this.refScene, 300, 666, 0);
		this.bouton.addEventListener("click", this.menuPageSuivante.bind(this), false);
	}

	private menuPageSuivante():void{
		if (this.menu.currentFrame == 0) {
			this.menu.pageSuivante();
			this.bouton.setLabel(1);
		}else{
			this.menu.detruire();
			this.bouton.detruire();
			this.debuter();
		}
	}
}
