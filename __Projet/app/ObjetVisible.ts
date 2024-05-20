import { Jeu } from "./Jeu";

export abstract class ObjetVisible extends createjs.MovieClip {
	private refStage: createjs.Stage = null;
	static refJeu:Jeu = null;

	public constructor(posX: number, posY: number) {
		super();
		this.gotoAndStop(0);
		this.dessiner();
		this.refStage = ObjetVisible.refJeu.getScene();
		this.refStage.addChild(this);

		this.x = posX;
		this.y = posY;
	}

	protected abstract dessiner(): void;

	// Utilisé par les detections de collision
	public retournerMonClip(): createjs.MovieClip {
		return this;
	}

	public destructeur(): void {
		this.x = null;
		this.y = null;
		this.name = null;
		this.removeAllEventListeners();
		this.refStage.removeChild(this);
	}
}