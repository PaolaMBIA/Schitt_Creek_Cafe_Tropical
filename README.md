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

### Visuel à avoir :

Sur l'interface développée, le(la) serveur(se) clique sur une table pour créer la commande et ensuite rajouter les informations nécessaires:

| Accueil | Ajout d'une nouvelle commande |
|---------|-------------------------------|
| <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/home.PNG"> | <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/addCustomer.PNG"> |
<br/>
<br/>

À la fin du repas le(la) serveur(se) a directement le total de la facture qui s'affiche et renseignes ensuite les autres informations nécessaires pour cloturer la facture. 
La nouvelle commande passée est directement visible dans la base de données:
| Total de la facture et ajout de commentaire du client | Commande visible dans la base de données |
|---------|-------------------------------|
| <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/totalBill.PNG"> | <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/mongoDB.PNG"> |

<br/>
<br/>

La platform permet également d'avoir des statistiques en fonction des éléments renseignés et le total de gain gagné :
| Visibilité des statistiques de la consommation d'un type de cuisson | Nombre de plats servis et total de gain |
|---------|-------------------------------|
| <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/stat.PNG"> | <img src="https://github.com/PaolaMBIA/Schitt_Creek_Cafe_Tropical/blob/main/photo/median.PNG"> |
