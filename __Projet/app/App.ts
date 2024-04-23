import { Ruelle } from './Ruelle';

export class App {

  // Attributs
  private scene: createjs.Stage = null;
  private ruelle: Ruelle = null;

  // Méthodes

  public constructor() {
    window.init(this); 	// Initialiser l'animation avec le méthode générée par Animate CC.
  }

  public initialiser(refscene: createjs.Stage): void {

    // Initialisation des attributs relatifs à l'animation ------------------------------------------------------------------
    this.scene = refscene; 					// Récupérer la références de la scène nouvellement créée
    createjs.Ticker.framerate = 30;   // Vitesse de l'animation (peut être modifiée si nécessaire)
    // ----------------------------------------------------------------------------------------------------------------------

    this.ruelle = new Ruelle(this.scene);
  }
}



