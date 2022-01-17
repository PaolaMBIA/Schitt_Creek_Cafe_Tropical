# Schitt_Creek_Cafe_Tropical

Ce projet est basé sur la réalisation d'une **API** avec **Node JS** et le **Cluster MongoDB**. Il y'a également une partie Front-end réalisée avec **React JS**

L'objectif étant de pouvoir prendre des commandes des clients et les stocker dans la base de données. Une manipulation de données est également faite dans l'API afin de pouvoir afficher des informations précises.

## Prérequis :
- Un éditeur de code (moi j'utilise Visual Studio Code)
- Node JS
- Un compte sur le Cluster MongoDB


## Partie Back-end

Après récupération du projet, n'oubliez pas de lancer la commande
`npm install`,
pour installer toutes les dépendances.

### Config à mettre en place :
- Mettre les informations de connexion au cluster dans `/config/db.js` 
- Créer un fichier `.env` dans `/config/` et rajouter les données suivantes <br/>
    - CLIENT_URL = http://localhost:3000 `l'url du client REACT`
    - DB_USER_PASS = nom_du_cluster_mongoDB:password `ton identifiant et mot de passe du cluster`
    - PORT = 5500 `le localhost port du back-end`
    - BAD_REQUEST = 400                
    - NOT_FOUND = 404                
    - INTERNAL_SERVER_ERROR = 500     
    - ID_NOT_ACCEPTABLE = 406         

### Lancer le server :
Se placer sur le dossier server et lancer le server <br/>
 `cd server` <br/>`npm start` 

## Partie Front-end

Se placer sur le dossier client et lancer le server <br/>
 `cd client` <br/>`npm start` 



