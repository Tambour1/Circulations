# Circulations App
Cette application a été réalisée par **Victor GEORGES**, étudiant de BUT 3 Informatique à l'IUT Nancy-Charlemagne, dans le cadre d'un cours d'interopérabilité.

# Tables des matières
- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Liens](#liens)

# Description
Ce projet est une application web croissant plusieurs APIs en temps réel pour récuprer des informations sur :
  - La météo du jour selon la géolocalisation
  - La qualité de l'air sur Nancy
  - La disponibilité des vélos partagés dans l'agglomération de Nancy.
  - Des informations sur l'épidemie de Covid
  - Des données sur le Sras dans les égoûts de Maxéville

# Technologies
- **Frontend** : HTML, CSS, JavaScript.
- **Backend** : Node.js, Express.js.
- **Librairies** : Leaflet.js pour la carte et Chart.js pour les graphiques

# Installation
## Cloner le dépôt
```bash
# clonage du projet
git clone https://github.com/Tambour1/Circulations.git

# se placer dans le répertoire 
cd Circulations

# Installer les dépendances
npm install
```
## Création d'un fichier .env
Il faudra ensuite créer à la racine du projet un fichier ".env" contenant une clé d'API pour la géolocalisation :
```.env
APIKEY=VotreCleAPI
```
Pour obtenir une clé d'API gratuite, il vous suffit de vous inscrire sur [ce site](https://app.ipgeolocation.io/login).
Pour des raisons de simplicité, j'ai également mis à disposition une clé d'API par defaut directement dans le code si la variable du .env est vide.
Evidement une clé d'API ne se met absolument pas en clair dans le code :)

## Utiliser Docker
```bash
# Lancer le conteneur à la racine du projet
docker-compose up -d --build

# Arrêter et supprimer le conteneur
docker-compose down
```

L'application sera accessible à l'adresse http://http://localhost:3006/circulations.html

# Liens
- Dépot git : https://github.com/Tambour1/Circulations.git
- Webetu : https://webetu.iutnc.univ-lorraine.fr/www/george264u/Interop/circulations/circulations.html
