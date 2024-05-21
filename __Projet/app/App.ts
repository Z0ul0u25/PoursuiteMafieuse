import { Jeu } from './Jeu';

/**
 * @class App
 * @author Inconnu et Philippe Gourdeau
 */
export class App {

  // Attributs
  private scene: createjs.Stage = null;
  private jeu: Jeu = null;

  // Méthodes

  public constructor() {
    window.init(this); 	// Initialiser l'animation avec le méthode générée par Animate CC.
  }

  public initialiser(refscene: createjs.Stage): void {

    // Initialisation des attributs relatifs à l'animation ------------------------------------------------------------------
    this.scene = refscene; 					// Récupérer la références de la scène nouvellement créée
    createjs.Ticker.framerate = 30;   // Vitesse de l'animation (peut être modifiée si nécessaire)

    // Evenement pour mêtre le jeu en pause si on perd le focus
    window.addEventListener("blur", this.tickFocus.bind(this), false);
    window.addEventListener("focus", this.tickFocus.bind(this), false);
    // ----------------------------------------------------------------------------------------------------------------------

    this.jeu = new Jeu(this.scene);
  }

  /**
   * Met le gestionnaire de tick en pause si le focus est à False
   * @param e Event de la fenetre
   */
  private tickFocus(e:Event):void{
    this.scene.tickEnabled = e.type == "focus";
  }
}



