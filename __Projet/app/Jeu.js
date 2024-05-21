define(["require", "exports", "./Rue", "./Menu", "./Boss", "./Maki", "./Wasabi", "./Ricardo", "./Missile", "./Explosion", "./AfficheurVie", "./AfficheurPts", "./ObjetVisible"], function (require, exports, Rue_1, Menu_1, Boss_1, Maki_1, Wasabi_1, Ricardo_1, Missile_1, Explosion_1, AfficheurVie_1, AfficheurPts_1, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jeu = void 0;
    /**
     * @class Jeu
     * @description Classe responsable de ce qui se passe dans le jeu
     * @author Philippe Gourdeau <2266603@csfoy.ca> <https://github.com/Z0ul0u25>
     */
    var Jeu = /** @class */ (function () {
        function Jeu(refScene) {
            this.refScene = null;
            this.rue = null;
            this.menu = null;
            this.afficheurVie = null;
            this.afficheurPts = null;
            this.ricardo = null;
            this.tAntagoniste = [];
            this.tDynamite = [];
            this.missile = null;
            this.tminDynamite = [];
            this.pauseMinuteurDynmite = null;
            this.musique = null;
            this._gestionMissile = this.gestionMissile.bind(this);
            // Applique la référence de jeu pour tout le monde
            ObjetVisible_1.ObjetVisible.refJeu = this;
            this.refScene = refScene;
            this.afficherMenu();
        }
        /**
         * Appeler pour faire (re)commencer le jeu
         */
        Jeu.prototype.debuter = function () {
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
            this.rue = new Rue_1.Rue();
            this.afficheurVie = new AfficheurVie_1.AfficheurVie();
            this.ricardo = new Ricardo_1.Ricardo(window.lib.properties.width / 2, window.lib.properties.height - 128, this.afficheurVie);
            // Premier niveau donc les deux premier Antagoniste font leur entré en scène
            this.tAntagoniste.push(new Maki_1.Maki(window.lib.properties.width * 0.35, 150));
            this.tAntagoniste.push(new Wasabi_1.Wasabi(window.lib.properties.width * 0.65, 150));
            for (var i = 0; i < this.tAntagoniste.length; i++) {
                // Ajout d'une minuterie pour faire apparaitre des Dynamite sur
                // chaque Antagonistes comme s'il les faisaient apparaître
                this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 1000 + i * 200, this.tAntagoniste[i]));
            }
            this.pauseMinuteurDynmite = false;
            this.afficheurPts = new AfficheurPts_1.AfficheurPts();
            this.refScene.addChild(this.afficheurPts);
            // Musique du niveau 1 en boucle
            this.musique = createjs.Sound.play("musique_n1", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
        };
        /**
         * Chargement du niveau 2
         */
        Jeu.prototype.chargementNiveau2 = function () {
            // Arrêt de la musique
            createjs.Sound.stop();
            // Assossiation de l'intro à la trame musicale du niveau 2
            this.musique = createjs.Sound.play("musique_n2_in", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: 0, volume: 0.5 });
            // Quand la musique d'intro aura fini, début véritable du niveau
            this.musique.on("complete", this.debuterNiveau2.bind(this));
        };
        /**
         * Début du niveau 2
         */
        Jeu.prototype.debuterNiveau2 = function () {
            // Remplacement de la musique pour la boucle de niveau 2
            this.musique = createjs.Sound.play("musique_n2_loop", { interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5 });
            // Apparition du Boss et d'interval pour lancer la Dynamite
            this.tAntagoniste.push(new Boss_1.Boss(window.lib.properties.width / 2, -150, this.ricardo));
            this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], -20));
            this.tminDynamite.push(window.setInterval(this.gestionDynamite.bind(this), Math.floor(Math.random() * 200) + 700, this.tAntagoniste[0], 20));
        };
        /**
         * Affiche le menu dans l'état voulu
         * @param etat État d'affichage du menu. Facultatif
         */
        Jeu.prototype.afficherMenu = function (etat) {
            if (etat === void 0) { etat = ""; }
            if (this.menu == null) {
                // Première fois que le jeu est lancé
                this.menu = new Menu_1.Menu();
            }
            else {
                // Change le menu de place avec d'autre élément de la scène affin d'être toujours rendu en face des autres
                this.menu.setVisibilite(true);
                this.refScene.swapChildren(this.menu, this.refScene.children[this.refScene.children.length - 3]);
                this.refScene.swapChildren(this.menu.getRefBouton(), this.refScene.children[this.refScene.children.length - 1]);
                this.menu.gotoAndStop(etat);
            }
            if (etat == "gagne") {
                // Déplace le compteur de point sur le menu
                this.afficheurPts.x = 400;
                this.afficheurPts.y = 500;
                this.refScene.swapChildren(this.afficheurPts, this.refScene.children[this.refScene.children.length - 2]);
            }
            else {
                // Affiche simplement le menu
                this.refScene.swapChildren(this.afficheurPts, this.refScene.children[this.refScene.children.length - 3]);
            }
        };
        /**
         * Gère les Dynamites sur le Jeu
         * @param antagoniste Référence à un objet Antagoniste
         * @param deltaX Position en X par rapport à l'Antagoniste
         * @param deltaY Position en Y par rapport à l'Antagoniste
         */
        Jeu.prototype.gestionDynamite = function (antagoniste, deltaX, deltaY) {
            var _this = this;
            if (deltaX === void 0) { deltaX = 0; }
            if (deltaY === void 0) { deltaY = 0; }
            if (this.refScene.tickEnabled && !this.pauseMinuteurDynmite) {
                // Ajout de la dynamite
                this.tDynamite.push(antagoniste.lanceDynamite(deltaX, deltaY));
                var nouvelleDynamite = this.tDynamite[this.tDynamite.length - 1];
                // Place les afficheurs et l'antagoniste devant la dynamite
                this.refScene.swapChildren(nouvelleDynamite, this.afficheurVie);
                this.refScene.swapChildren(nouvelleDynamite, this.afficheurPts);
                this.refScene.swapChildren(nouvelleDynamite, antagoniste);
                /**
                 * Suppression de dynamite hors vu
                 * La suppression est géré ici pour ne pas avoir à faire une
                 * fonction supplémentaire simplement pour vérifier toutes les
                 * dynamites à tous les tics. Ce qui demanderait plus de
                 * temps de processeur.
                 */
                this.tDynamite.forEach(function (dynamite) {
                    if (dynamite.y > window.lib.properties.height + 100) {
                        _this.detruireDynamite(dynamite, false);
                    }
                });
            }
        };
        /**
         * Detruit une Dynamite
         * @param dynamite Objet Dynamite
         * @param touche si elle touche à Ricardo
         */
        Jeu.prototype.detruireDynamite = function (dynamite, touche) {
            // Si la dynamite à touché, -100 pts
            if (touche) {
                this.afficheurPts.majPointage(-100);
            }
            this.tDynamite.splice(this.tDynamite.indexOf(dynamite), 1);
            dynamite.destructeur();
        };
        /**
         * Change l'état de pause pour les minuteur d'apparition de Dynamite
         */
        Jeu.prototype.alternerPauseMinuteurDynamite = function () {
            this.pauseMinuteurDynmite = !this.pauseMinuteurDynmite;
        };
        /**
         * Cache le compteur de point hors champ
         */
        Jeu.prototype.cacherPts = function () {
            if (this.afficheurPts != null) {
                this.afficheurPts.x = 1200;
            }
        };
        /**
         * Gestion du missile
         * Un seul missile peut être en jeu à la fois sinon, ce serait trop facile
         * de gagner au jeu
         * @param posX Position en X du Missile
         * @param posY Position en Y du Missile
         * @returns Si la référence au Missile est null
         */
        Jeu.prototype.gestionMissile = function (posX, posY) {
            var _this = this;
            if (posX === void 0) { posX = -1; }
            if (posY === void 0) { posY = -1; }
            // Si la position n'à pas été défini, il s'agit alors d'une
            // vérification à savoir s'il y a déjà un missile en jeu
            if (posX != -1) {
                if (this.missile == null) {
                    // Aparition du missile
                    this.missile = new Missile_1.Missile(this.ricardo.x + 12, this.ricardo.y - 83, this.ricardo.rotation);
                    this.refScene.addEventListener("tick", this._gestionMissile, false);
                }
                else {
                    // Vérification si le missile entre en contact avec un antagoniste
                    var touche_1 = false;
                    this.tAntagoniste.forEach(function (antagoniste) {
                        var point = _this.missile.parent.localToLocal(_this.missile.x, _this.missile.y, antagoniste);
                        if (antagoniste.hitTest(point.x, point.y)) {
                            new Explosion_1.Explosion(_this.missile.x, _this.missile.y, false);
                            antagoniste.jmeSuisFaitToucherPisCaFaitMal(1);
                            touche_1 = true;
                        }
                    });
                    if (touche_1 || this.missile.y < -100) {
                        // Si le missile touche on donne 1000 pts
                        // autrement on enlève 100 pts car La maison à une pauvre mamie au bout de la rue à explosé
                        this.afficheurPts.majPointage((touche_1 ? 1000 : -100));
                        // Destruction du missile
                        this.refScene.removeEventListener("tick", this._gestionMissile);
                        this.missile.destructeur();
                        this.missile = null;
                    }
                }
            }
            return this.missile == null;
        };
        /**
         * Gestion lorsque le jeu est perdu
         */
        Jeu.prototype.finDuJeuPerdu = function () {
            // On retire toute les Dynamites
            while (this.tminDynamite.length != 0) {
                clearInterval(this.tminDynamite.pop());
            }
            // Stop la rue de bouger
            this.rue.arreterDefilement();
            // Envoi de message au Antagoniste pour quitter la scène
            for (var i = 0; i < this.tAntagoniste.length; i++) {
                this.tAntagoniste[i].departDeFin();
            }
            // Affichage du menu après 2 secondes
            setTimeout(this.afficherMenu.bind(this), 2000, "perdu");
        };
        /**
         * Gestion lorsque le jeu est gagné
         */
        Jeu.prototype.finDuJeuGagne = function () {
            this.afficherMenu("gagne");
            // Oui, même si tu gagne, on te détruit.
            // Sinon on pourrait faire apparaitre des missiles à travers le menu.
            this.ricardo.destructeur();
        };
        /**
         * Gestion de destruction d'un Antagoniste
         * @param unAntagoniste Référence d'un Antagoniste
         */
        Jeu.prototype.detruireAntagoniste = function (unAntagoniste) {
            var isBoss = unAntagoniste.name == "Boss";
            if (!isBoss) {
                // L'Antagoniste et le minuteur de Dynamite partage le même index dans leur Array respectif
                clearInterval(this.tminDynamite[this.tAntagoniste.indexOf(unAntagoniste)]);
                this.tminDynamite.splice(this.tAntagoniste.indexOf(unAntagoniste), 1);
            }
            else {
                // Au Niveau 2, tout les minuteurs de Dynamite stop
                for (var i = 0; i < this.tminDynamite.length; i++) {
                    clearInterval(this.tminDynamite[i]);
                }
                this.tminDynamite = [];
                // Si Ricardo meurt après avoir tué le Boss, le jeu est quand même perdu
                if (this.ricardo.getVie() > 0) {
                    this.finDuJeuGagne();
                }
                else {
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
        };
        /**
         * Obtien le tableau de Dynamite
         * @returns le tableau de Dynamite
         */
        Jeu.prototype.getDynamites = function () {
            return this.tDynamite;
        };
        /**
         * Obtien la scène
         * @returns la Scène
         */
        Jeu.prototype.getScene = function () {
            return this.refScene;
        };
        return Jeu;
    }());
    exports.Jeu = Jeu;
});
//# sourceMappingURL=Jeu.js.map