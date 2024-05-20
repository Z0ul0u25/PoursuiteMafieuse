import { ObjetVisible } from "./ObjetVisible";
import { Bouton } from "./Bouton";

export class Menu extends ObjetVisible {

	private bouton: Bouton = null;

	constructor() {
		super(0, 0);

		let queue = new createjs.LoadQueue(true,"./",true);

        //Enregistre un plugin pour le sound (ici createjs.Sound)
        queue.installPlugin(createjs.Sound);

        //Déclare un écouteur pour la fin du chargement
        queue.addEventListener("complete", this.chargementFini.bind(this));

        //Déclare un écouteur pour superviser le progrès du chargement
        // queue.addEventListener("progress",this._surProgresChargementBindRef);

        //Déclare un écouteur pour superviser une erreur sur le chargement
        queue.addEventListener("error", this.chargementErreur.bind(this));

        //Charge les fichiers du manifeste
        queue.loadManifest(window.lib.properties.manifest);
	}

	protected dessiner(): void {
		window.lib.ClipMenu.call(this);
		this.frameBounds = window.lib.ClipMenu.prototype.frameBounds;
	}

	public pageSuivante():void{
		if (this.currentFrame != 1) {
			this.gotoAndStop(1);
			this.bouton.setLabel(1);
			ObjetVisible.refJeu.cacherPts();
		} else {
			this.visible = false;
			ObjetVisible.refJeu.debuter();
		}
	}

	private chargementFini():void{
		this.bouton = new Bouton(300, 666, 0);
		this.bouton.addEventListener("click", this.pageSuivante.bind(this), false);
	}

	private chargementErreur():void{
		console.log("Errrrror");
	}

	public setVisibilite(b:boolean):void{
		this.visible = b;
	}

	public getRefBouton():Bouton{
		this.bouton.gotoAndStop(2);
		return this.bouton;
	}

	public destructeur(): void {
		this.bouton.destructeur();
		this.bouton = null;
		this.removeAllEventListeners();
		super.destructeur();
	}
}