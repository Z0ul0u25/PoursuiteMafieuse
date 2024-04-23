import { Ricardo } from "./Ricardo";

export class Ruelle {
	private refScene:createjs.Stage = null;

	private ricardo:Ricardo=null;

	constructor(refScene: createjs.Stage) {
		this.refScene = refScene;
		this.debuter();
	}

	public debuter():void{
		this.ricardo = new Ricardo(this.refScene, window.lib.properties.width/2, window.lib.properties.height-60);
	}
}