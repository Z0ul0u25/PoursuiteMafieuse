import { Rue } from "./Rue";
import { Ricardo } from "./Ricardo";
import { Maki } from "./Maki";
import { Wasabi } from "./Wasabi";

export class Jeu{
	private refScene:createjs.Stage = null;
	private ricardo:Ricardo=null;
	private tAntagoniste:any[] = [];
	private rue:Rue=null;

	constructor(refScene:createjs.Stage) {
		this.refScene = refScene;
		this.debuter();
	}

	public debuter():void{
		this.rue = new Rue(this.refScene);
		this.ricardo = new Ricardo(this.refScene, window.lib.properties.width/2, window.lib.properties.height-60);
		this.tAntagoniste.push(new Maki(this.refScene, window.lib.properties.width*0.35, 150));
		this.tAntagoniste.push(new Wasabi(this.refScene, window.lib.properties.width*0.65, 150));
	}
}
