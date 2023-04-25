# IOT_tp_2023

**TP1 Analog_Input_Turn_On_Light_When_No_Light :**

  Description: Ceci est un exemple de sketch Arduino qui montre comment lire une entrée analogique à partir d'un potentiomètre et contrôler l'état d'une LED en fonction de la lecture analogique. La LED s'allumera pendant une durée basée sur la lecture analogique, puis s'éteindra pendant une autre durée basée sur la même lecture.

  Circuit:
  -Potentiomètre: Connectez la broche centrale à l'entrée analogique A1, une broche latérale à la terre et l'autre broche latérale à +5V.
	
  -LED: L'anode (patte la plus longue) est connectée à la sortie numérique 13 via une résistance de 220 ohms, et la cathode (patte    la plus courte) est connectée à la terre.

**TP2 Blink:**

  On utilise la bibliothèque Johnny-Five pour contrôler une LED connectée au pin 10 d'une carte Arduino via un ordinateur. Pour l'utiliser, vous devez installer Johnny-Five en tant que dépendance dans votre projet Node.js.

  Une fois le programme exécuté, une connexion sera établie avec la carte Arduino (connectée au port COM6) et la LED connectée au pin 10 commencera à clignoter avec des périodes d'allumage et d'extinction de 500ms.

Ce code peut être modifié pour contrôler d'autres composants électroniques connectés à la carte Arduino en utilisant différentes méthodes disponibles dans la bibliothèque Johnny-Five.

**TP3 Smart-House Project avec Johnny-Five et Express :**

Pour Lancer Le Projet:

- Cloner le projet : git clone "https://github.com/fredpatch/IOT_tp_2023.git"
- Unzip le dossier Smart_Home_Project
- Assurez-vous d’avoir installé Node.js : "https://nodejs.org/en"
- Ouvrez le projet dans votre IDE,
- Ouvrez votre IDE Arduino puis connectez-le, 
- Gardez le port com sur papier, téléchargez StandardFirmata sur votre Arduino,
- Ouvrez le fichier 'light.js' et éditez le port com,
- Dans le terminal, exécutez la commande: npm run smart 
- Dans votre navigateur, ouvrez : "localhost:3002"

NB : autorisez votre navigateur à utiliser votre localisation pour que le bulletin météo fonctionne correctement.


1) Presentation:

Le projet 'Smart_Home_Project' est base sur un simple MVC (Model-View-Controler) modele.

Le modèle définit la structure des données, met à jour l’application lorsque des modifications sont effectuées. Puis la vue qui s’occupe de l’affichage (UI) et le contrôleur qui retient la logique de l’application.

**Les différents outils utilisés:**

-Node.js: Plate-forme logicielle qui permet d’exécuter du code JavaScript côté serveur.
--> installation: "https://nodejs.org/en"

- Express.js: Node.js framework Web permettant la création d’applications Web utilisant des fonctionnalités telles que la gestion de routeur, la réponse et la requête HTTP...
--> npm install express --save

- Johnny-Five: Bibliothèque JavaScript open-source pour la programmation de cartes électroniques basée sur Arduino et d’autres microcontrôleurs.
--> npm install johnny-five

- EJS: Simple Templating language permettant de générer du balisage HTML avec JavaScript.
--> npm i ejs

- Nodemon: Outil de développement simple pour Node.js qui redémarre automatiquement le serveur après les modifications apportées à un fichier.
--> npm install --save-dev nodemon

2) Fonctionalité:

** Manual Function **
La fonction « manual » allume la led de la maison en fonction de la luminosité de la pièce.


https://user-images.githubusercontent.com/40575184/234405484-c9cf6076-6b17-4171-bb99-cf77490e6334.mp4



Après avoir cliqué sur le bouton, le contrôleur de l’index récupère l’état manuel du routeur (light.js) qui prend en charge toutes les opérations sur la maison; que ce soit pour le bouton manuel ou automatique.

** Automatic Function **

https://user-images.githubusercontent.com/40575184/234405587-b820ead8-3756-426e-9c23-c33bbde9500f.mp4



** Affichage des donnees du capteur **
	
 Avec l'aide de sliding window, on recupere un visuel pour afficher les donnees capturer par le capteur.
    -Importez D3.js via la CDN de jsDelivr: "import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";"
			 -Utilisez la fonction random() pour générer des données de test.
    -On remplace cette fonction par les donnees de l'aggregation du capteur, pour obtenir une meilleur lecture du diagram.
 <img width="199" alt="image" src="https://user-images.githubusercontent.com/40575184/234386663-5478f458-e1e6-4973-af55-a780763f9f72.png">
<img width="352" alt="image" src="https://user-images.githubusercontent.com/40575184/234386744-38b31935-b5e5-45cf-827d-b6abc7d915e2.png">


https://user-images.githubusercontent.com/40575184/234405654-bc047180-d0c7-4b74-85cf-caaa48bb7e79.mp4


** Geolocalisation / Meteo **


** Sunset / Sunrise (experimental) **

On utilise l'API sunrise-sunset pour récupérer l'heure du lever et du coucher du soleil puis cette information est utilisée pour allumer ou éteindre automatiquement la led.
Ces horaires sont ensuite comparer avec l'heure actuel du system pour determiner l'allumage; l'extinction de la led. Le routeur dispose de deux methode qui gerent ces fonctionalitees.

**sun_down**
<img width="548" alt="image" src="https://user-images.githubusercontent.com/40575184/234384072-35733e09-410f-4e01-9329-cef04af8accd.png">

**sun_up**
<img width="478" alt="image" src="https://user-images.githubusercontent.com/40575184/234384463-a0f63449-dc9f-4b8d-8f83-52a566626768.png">

Lorsque le 'sun is up' un indicateur (un texte) est visible au milieux de l'animation; de meme que lorsque le 'sun is down'.
<img width="422" alt="image" src="https://user-images.githubusercontent.com/40575184/234385425-58963dcf-8a70-4dd8-82fc-335e5b771485.png">


NB: Au lancement du serveur, ces fonctionalitees sont active par defaut; l'idee serait de les activees au besoin de l'utilisateur.


		










