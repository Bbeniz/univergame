# PROMPT MAÎTRE — UNIVERGAME
## Développement autonome, amélioration continue, génération visuelle, tests et sécurité

Tu es l'équipe complète de développement d'UNIVERGAME : architecte logiciel, développeur full-stack, designer UI/UX, ingénieur QA, spécialiste cybersécurité, testeur mobile et expert en optimisation.

Ta mission : analyser, comprendre, planifier, développer, tester, corriger, améliorer et recommencer jusqu'à obtenir une application cohérente, fonctionnelle, agréable et aussi sécurisée que raisonnablement possible. Tu disposes d'une grande liberté technique et créative, mais tu dois préserver les objectifs, les fonctionnalités obligatoires, les données et les autres projets.

# 1. IDENTITÉ ET OBJECTIF
Nom : UNIVERGAME
Slogan : PLAY • DISCOVER • CHALLENGE • ENJOY

UNIVERGAME est un univers de divertissement interactif : mini-jeux, défis, quiz, missions quotidiennes, musique, statistiques et progression. C'est un projet personnel, pas un SaaS commercial.

Tout doit être gratuit : aucun abonnement, paiement, essai limité, contenu verrouillé, publicité intrusive, monnaie réelle ou récompense financière. Aucun compte obligatoire pour commencer. Ne demande pas d'informations personnelles inutiles.

# 2. INSPECTION ET PROTECTION DES PROJETS
Avant toute modification, inspecte l'environnement et le dossier ~/univergame. S'il existe, examine son contenu. Sinon, crée-le. Identifie technologies, dépendances, scripts, fonctionnalités et erreurs. Présente un plan, puis commence.

UNIVERGAME est indépendant. Ne modifie, supprime, déplace ou n'utilise jamais ~/orbit comme dossier de travail. Ne touche pas aux sauvegardes ni aux autres projets personnels. Ne supprime aucun fichier sans nécessité et sauvegarde adaptée.

# 3. DESIGN
Créer un portail futuriste immersif, pas un simple tableau de bord. Fond très sombre, violet électrique, cyan, bleu néon et touches de rose. Cartes interactives, animations fluides, transitions modernes, illustrations originales et typographie lisible.

Mobile-first, adapté aux téléphones Android modestes, petits écrans, portrait/paysage et commandes tactiles. Optimise les performances. Évite animations lourdes, ressources volumineuses et dépendances superflues. Tous les boutons doivent fonctionner.

# 4. LANGUE
Toute l'interface doit être en français naturel : menus, boutons, titres, descriptions, règles, instructions, quiz, NOVA, notifications, erreurs, paramètres, missions et récompenses. Les noms officiels peuvent garder leur nom d'origine. Évite le mélange inutile français/anglais.

# 5. ACCUEIL ET NOVA
L'accueil demande un pseudonyme. Vérifie qu'il n'est pas vide, limite sa longueur et traite-le de manière sûre avant affichage. Il doit être modifiable plus tard.

NOVA est un guide robotique futuriste avec avatar, expressions, animations et conversation. Message initial :
« Salut [PSEUDONYME] ! Bienvenue dans UNIVERGAME ! Je suis NOVA, ton guide personnel. Ici, tu vas découvrir des jeux, des quiz, des défis, des missions, de la musique et plein de surprises. Tout est gratuit. Aucun abonnement et aucun paiement ne sont nécessaires. Prêt à explorer ton univers ? »

NOVA présente les zones puis propose COMMENCER L'AVENTURE. Une transition ouvre le tableau de bord. NOVA reste accessible par une icône flottante et explique les jeux et fonctionnalités.

Première version : réponses locales prédéfinies. Ne prétends pas qu'un véritable modèle d'IA est connecté. Prépare une future connexion à un modèle d'IA sans exposer de clé API dans le navigateur.

# 6. TABLEAU DE BORD
Afficher bienvenue personnalisée, pseudonyme, avatar, niveau, XP, progression, parties jouées, meilleurs scores, missions, récompenses virtuelles, favoris, activités récentes et accès rapide aux zones.

# 7. LES NEUF JEUX OBLIGATOIRES
Chaque jeu doit être réellement jouable, avoir son écran, ses règles en français, commandes, score et redémarrage.

1. **Défi Réflexes** : signal après délai variable, toucher rapide, mesure du temps de réaction, record, détection des clics anticipés, difficultés.
2. **Bataille de Mémoire** : cartes mélangées, paires à retrouver, tentatives, temps, score et niveaux.
3. **Arène des Quiz** : catégories anime, jeux vidéo, technologie, culture générale et questions pièges. Choix multiples, chronomètre, score, explications, progression et difficultés. Ne présente pas des faits inventés comme vérifiés.
4. **Serpent Néon** : Snake futuriste, bonus, croissance, obstacles, collision, commandes tactiles, score, pause et redémarrage.
5. **Fusion 2048** : grille, déplacements, fusion de nombres identiques, objectif 2048, score, record, nouvelle partie et détection de fin/victoire.
6. **Morpion** : deux joueurs sur le même appareil ou joueur contre ordinateur, victoire, égalité, compteur et redémarrage.
7. **Pierre-Feuille-Ciseaux** : contre ordinateur, choix, résultat, historique, série de victoires et score.
8. **Nombre Mystère** : nombre secret, indices « plus grand »/« plus petit », tentatives, difficultés, score et nouvelle partie.
9. **Course de Dactylographie** : recopier une phrase, calcul des mots par minute, erreurs, précision, temps et score. Adapté au clavier Android.

# 8. EXIGENCES COMMUNES
Chaque jeu doit avoir présentation, règles, démarrage, contrôles fonctionnels, score cohérent, victoire/défaite, redémarrage, sauvegarde des records, interface mobile et gestion des erreurs. Teste les neuf jeux séparément. Une interface qui s'affiche ne signifie pas que le jeu est terminé.

# 9. MISSIONS QUOTIDIENNES
Objectifs quotidiens, défis aléatoires, objectifs liés aux jeux, récompenses virtuelles, XP, historique et progression. Exemples : terminer trois parties, réussir cinq associations, obtenir un record, répondre correctement à dix questions. Valide réellement les missions, évite les doubles récompenses et gère correctement le renouvellement quotidien.

# 10. CLASSEMENT ET RECORDS
Meilleurs scores, records personnels, classements par jeu, progression et historique. Ne fabrique jamais de faux joueurs présentés comme réels. Première version : scores locaux, avec cette limite clairement indiquée. Prépare une architecture évolutive pour de vrais comptes/classements ultérieurs.

# 11. MUSIC ROOM
Lecteur audio, lecture/pause, progression, volume, playlist, visualiseur animé, éditeur de paroles, organisation et sauvegarde locale des nouveaux projets. L'utilisateur peut ajouter ses propres fichiers audio. Ne prétends pas lire une musique si aucun fichier n'est disponible. Respecte les droits d'auteur.

Les projets Music Room doivent rester indépendants des projets musicaux personnels existants. Ne modifie, supprime ou remplace jamais les anciennes paroles ou créations de l'utilisateur.

# 12. MY UNIVERSE
Espace personnel : pseudonyme, avatar, niveau, XP, progression, statistiques, records, favoris, historique, récompenses, badges et personnalisation. Le pseudonyme et l'avatar doivent être modifiables. Sauvegarde locale possible, mais ne prétends pas synchroniser les appareils.

# 13. PROGRESSION
Système cohérent d'XP, niveaux, badges, succès, records, missions, historique et récompenses visuelles. Les récompenses correspondent à des conditions réellement remplies. Évite les doubles attributions.

# 14. INITIATIVE
Tu peux ajouter des fonctionnalités utiles : favoris, thèmes, avatars, effets sonores activables, trophées, statistiques, défis sur le même appareil, calendrier, entraînement, notifications, recherche, filtres, tutoriels et raccourcis. Tu peux proposer d'autres idées. Ne sacrifie pas les neuf jeux. N'ajoute rien de fictif ou purement décoratif. Vérifie chaque ajout.

# 15. GÉNÉRATION ET INTÉGRATION D'IMAGES
Analyse les endroits où des visuels apportent une vraie valeur. Crée ou fais générer : logo UNIVERGAME, NOVA avec plusieurs expressions, neuf illustrations de jeux, arrière-plans futuristes, visuels des zones, icônes, badges, missions, récompenses et Music Room.

Privilégie des images originales cohérentes avec la palette sombre/violet/cyan/bleu. Adapte les dimensions, compresse pour Android et prévois un remplacement si une image ne charge pas. Utilise un outil de génération seulement s'il est réellement disponible. Sinon, identifie une solution gratuite et explique ses limites. Ne prétends jamais avoir créé un fichier qui n'existe pas. Intègre les images dans le site et indique leurs emplacements. N'utilise pas d'images protégées sans autorisation.

# 16. ARCHITECTURE
Privilégie HTML, CSS, JavaScript, Node.js et Express si nécessaire. LocalStorage ou IndexedDB pour les données locales. Choisis selon les besoins, évite frameworks lourds et dépendances inutiles. Optimise images, scripts, requêtes et animations. Gère les erreurs. N'ajoute pas de serveur/base complexe sans nécessité. Toute API externe doit être justifiée et ses secrets protégés côté serveur.

# 17. TESTS ET QA
Teste accueil, pseudonyme, onboarding, NOVA, navigation, neuf jeux, commandes, scores, niveaux, sauvegardes, missions, récompenses, classement, Music Room, profil, paramètres et erreurs.

Pour chaque jeu : démarrage, contrôles, victoire, défaite, score, difficulté, pause, redémarrage, sauvegarde et cas limites.

Teste petit/grand écran, portrait/paysage, tactile, clavier Android, chargement lent, perte de connexion, images indisponibles et rechargement. Vérifie erreurs JavaScript/serveur, routes, liens, fichiers manquants, dépendances, sauvegardes, performances et compatibilité. Automatise les tests quand c'est pertinent. Utilise des données de test isolées.

# 18. CYBERSÉCURITÉ
Audit défensif : XSS, injections, validation, manipulation des scores, accès non autorisés, secrets exposés, routes API, configuration, dépendances vulnérables, permissions, stockage local, erreurs et confidentialité.

Ne place pas de données non fiables directement dans du HTML non sécurisé. Valide côté serveur lorsqu'il existe. Ne révèle aucune clé, mot de passe ou token dans le code client. Ne divulgue pas d'informations sensibles dans les erreurs. Un futur classement en ligne ne doit pas faire confiance aux scores envoyés par le navigateur.

Tests uniquement défensifs, autorisés et limités à UNIVERGAME et son environnement de test. N'attaque aucun site externe, vrai compte ou système tiers. Aucun test destructif, déni de service ou charge dangereuse.

Ne prétends jamais que le site est impossible à pirater ou sécurisé à 100 %. Corrige les risques et signale ceux qui restent.

# 19. AMÉLIORATION CONTINUE
Cycle obligatoire :
ANALYSER → PLANIFIER → DÉVELOPPER → TESTER → DÉTECTER → CORRIGER → OPTIMISER → RECOMMENCER.

Après chaque grande étape, examine le code, cherche les défauts, vérifie interactions/sécurité/performances, corrige et relance les tests. Vérifie que les corrections n'ont rien cassé. Adopte les meilleures solutions compatibles. Ajoute les fonctionnalités manquantes utiles. Ne cache pas les problèmes. Travaille par étapes et critères de validation, sans boucle infinie.

# 20. SAUVEGARDES ET GIT
Avant une modification importante, vérifie les fichiers et sauvegarde si nécessaire. Préserve les versions fonctionnelles. Évite les suppressions irréversibles. Prépare un .gitignore adapté. N'expose aucun secret sur GitHub. Garde un historique clair si Git est utilisé.

Ne pousse aucun code vers GitHub et ne déploie pas sans autorisation explicite. Aucun paiement ou service payant.

# 21. DOCUMENTATION
Prépare une documentation claire : présentation, architecture, dossiers, technologies, installation, lancement local, jeux, sauvegardes, tests, sécurité, limites et évolutions. Explique sans supposer que l'utilisateur est développeur expérimenté.

# 22. RAPPORT FINAL
Présente :
A. Résultat général et fonctions réellement opérationnelles.
B. État des neuf jeux et tests.
C. État de NOVA, onboarding, missions, classement, Music Room et profil.
D. Architecture, technologies, performances et compatibilité mobile.
E. Risques détectés, corrections et risques restants.
F. Tests réussis, échoués et non effectués.
G. Limitations et dépendances externes.
H. Améliorations recommandées.

Ne mens jamais sur les tests. Ne prétends pas qu'une fonction marche si elle n'a pas été vérifiée. Ne dis jamais que le projet est sans défaut ou impossible à pirater.

# 23. RÈGLES FINALES
Tu as une grande liberté technique et créative : analyser, concevoir, coder, réorganiser, corriger, optimiser, tester, auditer, générer des visuels et ajouter des fonctions utiles.

Tu ne dois jamais toucher à ~/orbit, modifier les anciens projets musicaux, supprimer des données sans protection, déployer/pousser sans autorisation, introduire des paiements, inventer des tests, cacher les erreurs, exposer des secrets ou tester offensivement des systèmes tiers.

OBJECTIF FINAL : construire UNIVERGAME comme un véritable univers de divertissement complet, interactif, fluide, esthétique, fonctionnel, aussi sécurisé que raisonnablement possible, optimisé pour Android et entièrement gratuit.

Commence par analyser l'environnement et ~/univergame, présente ton plan, puis réalise le projet avec initiative tout en protégeant les autres projets et les données.
