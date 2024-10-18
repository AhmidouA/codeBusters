# parkBusters API

**parkBuster API** est une API qui permet de fournir des informations sur la disponibilité des vélos et les places de parking disponibles à une adresse choisie. L'API interagit avec des données externes provenant de [portail-api.montpellier3m.fr](https://portail-api.montpellier3m.fr/) et intègre certaines données dans une base de données locale via Prisma.

## Technologies utilisées

-   **Langages**: JavaScript, TypeScript
-   **Framework**: [Express.js](https://expressjs.com/) - un framework minimaliste pour les applications Node.js.
-   **ORM**: [Prisma](https://www.prisma.io/) - un ORM moderne pour Node.js et TypeScript.
-   **Base de données**: Au choix, via Prisma (compatible avec PostgreSQL).
-   **APIs externes**: [Portail API Montpellier3M](https://portail-api.montpellier3m.fr/) pour récupérer les données en temps réel sur les stations de vélos.

## Fonctionnalités

-   **Récupérer les parkings des vélos sur un périmètre choisi** à une station donnée.
-   **Récupérer les disponibilités des vélos** à une station donnée.
-   **Récupérer les parkings des voitures sur un périmètre choisi** à une station donnée.
-   **Récupérer les disponibilités des voitures** à une station donnée.
-   **Intégrer des données** provenant de l'API de Montpellier dans une base de données locale via Prisma.
-   **Fournir les places de parking disponibles** à partir d'une adresse donnée.
-   **Gestion des erreurs et des réponses claires** pour assurer une expérience API fluide.

### Envoi en temps réel

L'API permet d'envoyer les informations sur les parkings (vélos et voitures) dans un périmètre défini, ainsi que la disponibilité en temps réel des vélos et voitures aux stations sélectionnées.

## Installation

### Prérequis

-   Node.js >= v14.x
-   npm >= v6.x
-   Une base de données (PostgreSQL) compatible avec Prisma.

### Étapes

1.  **Cloner le dépôt** :

    ```bash
    git clone https://github.com/AhmidouA/codeBusters
    cd le-repo
    ```

2.  **Installer les dépendances** :

    ```bash
    npm install
    ```

3.  **Configurer la base de données** :

        - Créez un fichier `.env` à la racine du projet et configurez-y les détails de connexion à votre base de données. Exemple pour une base de données PostgreSQL :

        ```env

    DATABASE_URL="postgresql://username:password@localhost:5432/codebusterDB?schema=public"

    ```

        - Mettez à jour le fichier `schema.prisma` si vous souhaitez adapter les modèles à votre base de données.

    ```

4.  **Migrer la base de données** :

    ```bash
    npx prisma migrate dev
    ```

5.  **Lancer le serveur en mode développement** :

    ```bash
    npm run dev
    ```

6.  **Lancer le serveur en production** :
    ```bash
    npm start
    ```

## Structure du projet

Le projet suit une architecture modulaire et organisée, facilitant la maintenance et l'extension du serveur. Voici la structure principale :

### Détails des dossiers

-   **config/** : Contient la configuration de prisma avec les schema et la config.db.
-   **controllers/** : Contient les fonctions qui gèrent les requêtes HTTP pour chaque route de l'API. Par exemple, `station.controller.ts` pour gérer les requêtes liées aux stations de vélo.

-   **middlewares/** :

-   **models/** :

-   **routes/** : Contient les définitions des routes de l'application. Chaque fichier représente un ensemble de routes, par exemple `station.routes.ts` pour toutes les routes liées aux stations de voiture et vélo.

-   **shared/** : Contient des ressources communes réutilisables dans l'application, comme des types TypeScript partagés ou des constantes globales.

-   **utils/** :

-   **index.ts** : Point d'entrée principal de l'application, où Express est initialisé et où les middlewares globaux et routes sont configurés.

## Scripts npm

-   `npm run dev` : Lancer le serveur en mode développement avec rechargement automatique via `nodemon`.

## API Endpoints

Voici les différentes routes que vous pouvez appeler dans cette API :

-   **GET /api/stations** : Récupérer la liste des stations de vélo et de voiture en fonction de la position et d'un rayon.
-   **POST /api/stations/bikes** : Importer les données des stations de vélos depuis l'API de Montpellier dans la base de données.
-   **POST /api/stations/cars** : Importer les données des stations de voitures depuis l'API de Montpellier dans la base de données.
-   **GET /api/stations/:id** : Récupérer les informations de disponibilité d'une station spécifique (vélos ou voitures).
    spécifique.

### Exemples d'utilisation

-   **Obtenir la position des parking voiture sur un rayon**
-   **Obtenir la position des parking velo sur un rayon**
-   **Obtenir la disponibilité des parking voiture en temps reel** :
-   **Obtenir la disponibilité des vélos d'une station en temps reel** :

Ce fichier README donne une vue complète du projet, y compris l'intégration de Prisma, l'utilisation des API externes, et les détails techniques liés à l'architecture du projet.
