# parkBuster

ParkBuster est une application web permettant de localiser facilement des parkings pour vélos et voitures autour d'une adresse ou de la position actuelle de l'utilisateur. En se basant sur les coordonnées GPS (longitude et latitude), l'application affiche les stations disponibles à proximité en fonction des préférences sélectionnées (vélo ou voiture).

## Fonctionnalités

### Frontend:

**Recherche d'une adresse** : Localisez les parkings autour d'une adresse recherchée.
**Localisation utilisateur** : Affichez les parkings à proximité de votre position actuelle grâce à la géolocalisation.
**Affichage des parkings disponibles** : Sélectionnez, via une case à cocher, les places de parking pour vélos ou voitures disponibles à proximité.
**Disponibilités en temps réel** : Consultez les disponibilités des vélos ou des places de parking en temps réel autour de vous.
**Ajustement du rayon de recherche** : Ajustez la taille du rayon de recherche en fonction de vos besoins.

### Backend (API):

**Importation des données** : L'API permet d'importer les données des stations de vélos et de voitures depuis l'API publique de Montpellier.
**Récupération des parkings** : Selon les coordonnées fournies, l'API retourne les places de vélos ou voitures disponibles à proximité.
**Intégration dans la base de données** : Les données récupérées de l'API de Montpellier sont stockées dans une base de données locale gérée via Prisma.

## Stack Technologique

### Frontend:

- React TypeScript : Utilisé pour construire une interface utilisateur réactive et robuste, tout en bénéficiant de la sécurité des types avec TypeScript.
  CSS : Pour le style et la personnalisation visuelle de l'application.

### Backend:

- Node.js & Express : Utilisés pour créer l'API qui gère les requêtes de données.
- TypeScript & JavaScript : TypeScript apporte de la robustesse au code, combiné avec JavaScript pour une flexibilité accrue.
- Prisma : Utilisé comme ORM pour interagir avec la base de données.
- API publique de Montpellier : Fournit des informations sur les stations de parkings vélos et voitures.

## User Stories

Utilisateur
**Recherche d'une adresse** :

- En tant qu'utilisateur, je souhaite pouvoir rechercher une adresse et voir les parkings disponibles à proximité, afin de choisir où garer mon vélo ou ma voiture.

**Localisation de l'utilisateur**:

- En tant qu'utilisateur, je souhaite être géolocalisé automatiquement pour trouver les parkings autour de moi sans avoir à entrer d'adresse.

**Affichage des vélos ou parkings disponibles** :

- En tant qu'utilisateur, je souhaite choisir si je veux voir les places de vélos ou de voitures à proximité et ajuster mon rayon de recherche en fonction de mes besoins.

**Ajuster le périmètre de recherche** :

- En tant qu'utilisateur, je souhaite pouvoir ajuster le rayon de recherche autour de ma position pour avoir des résultats plus précis ou plus larges.

## L'équipe

- Yann (dev front) : Je chasse les bugs avec précision et calme. Je trouve des solutions efficaces aux fantômes du numérique.
- Amanda (dev front) : Créative, curieuse, j’ai hâte de rejoindre une équipe à taille humaine qui œuvre pour améliorer le quotidien de ses clients.
- Cyril (dev back) : Développeur en développement et expert en expertise, je suis prêt à débugger tout ce qui bouge.
- Ahmed (dev back & project manager) : Code ou gestion, j'exorcise les bugs avec rigueur et créativité. Un problème persistant ? Il disparaît sous mes lignes de code !

## Cahier des Charges

**Objectifs**

- Développer une application web permettant de localiser des places de parkings pour vélos ou voitures autour d'une adresse spécifique ou de l'utilisateur.
- Intégrer une API publique pour récupérer les informations de disponibilité en temps réel des places de parkings.
- Utiliser une base de données Prisma pour stocker et gérer les données des stations.
- Fournir une interface utilisateur simple et intuitive pour afficher les résultats et ajuster le rayon de recherche.

**Contraintes**

- Réactivité : L'application doit être réactive, afficher les résultats rapidement et permettre une expérience utilisateur fluide.
- Géolocalisation : Utiliser l'API de géolocalisation pour identifier l'emplacement de l'utilisateur.
- Recherche d'adresse : L'utilisateur doit pouvoir entrer une adresse manuellement ou être géolocalisé automatiquement.

## Présentation

Equipe créative et dynamique qui chasse et exorcise les problèmes de code en apportant des
solutions innovantes, déboguant avec précision et optimisant les performances

Lorsque des bugs hantent vos projets, une seule solution :

les CodeBusters !

Chasseurs de bugs et créateurs de solutions

## L'équipe

Yann (dev front) : Je chasse les bugs avec précision et calme. Je trouve des solutions efficaces aux fantômes du numériques.

Amanda (dev front) : Créative, curieuse, j’ai hâte de rejoindre une équipe à taille humaine qui œuvre pour améliorer le quotidien de ses clients

Cyril (dev Back): Développeur en développement et expert en expertise, je suis prêt à debugger tout ce qui bouge.

Ahmed (dev Back & project manager): Code ou gestion, j'exorcise les bugs avec rigueur et créativité. Un problème persistant ?

## Backlog

Le backlog que nous avons organisé sur Trello pour le projet ParkBuster. Ce tableau regroupe toutes les fonctionnalités à développer, les améliorations à apporter, ainsi que les corrections de bugs à traiter.

[Trello](https://trello.com/b/eIEvp48g/codebusters/)

## Fonctionnalités à venir

### 1. Détailler le type de parking (gratuit / payant / etc...)

- **Description** : Ajouter des informations détaillées sur chaque parking, indiquant s'il est gratuit ou payant.
- **Utilité** : Cela permettra aux utilisateurs de choisir un parking en fonction de leurs préférences (gratuit ou payant) et de planifier en conséquence.
- **Implémentation** : Ajouter des champs supplémentaires à la base de données pour chaque parking afin de savoir si il est payant ou gratuit. Récupérer ces données de l'API lorsque cela est disponible.

### 2. Afficher les places PMR (Personnes à Mobilité Réduite)

- **Description** : Afficher des parkings ou des emplacements spécifiques réservés aux personnes à mobilité réduite (PMR).
- **Utilité** : Faciliter l'accès aux personnes ayant des besoins spécifiques, en leur permettant de localiser rapidement des places adaptées à leurs besoins.
- **Implémentation** : Ajouter des informations PMR pour chaque station de parking dans la base de données et afficher ces emplacements de manière distincte sur la carte.

### 3. Afficher les stations vélos en libre-service

- **Description** : Mettre en évidence les stations de vélos en libre-service (type velo perso), permettant aux utilisateurs de se garer facilement.
- **Utilité** : Favoriser la mobilité verte en incitant les utilisateurs à utiliser des vélos plutôt que des voitures.
- **Implémentation** : Intégrer les données des stations de vélos en libre-service dans le système, et afficher les stations disponibles sur la carte.

### 4. Création des utilisateurs

- **Description** : Permettre aux utilisateurs de créer des comptes personnels sur l'application.
- **Utilité** : Offrir des fonctionnalités personnalisées, comme la gestion des favoris, des historiques de recherche, et des notifications sur la disponibilité des parkings ou des vélos.
- **Implémentation** : Créer un système d'inscription et de gestion des utilisateurs, stockant les informations dans une base de données sécurisée.

### 5. Connexion utilisateurs avec favoris et historique

- **Description** : Une fois que les utilisateurs peuvent se connecter, leur permettre de sauvegarder des parkings ou des stations de vélos en favoris et de consulter leur historique de recherches ou d'utilisations passées.
- **Utilité** : Simplifier la réutilisation des emplacements souvent visités, et fournir des recommandations personnalisées en fonction de l'historique.
- **Implémentation** : Ajouter une gestion des favoris et de l'historique au profil utilisateur, avec des options pour sauvegarder des trajets ou des stations fréquemment utilisées.

### 6. Afficher le pathfinding de la destination au parking

- **Description** : Proposer un itinéraire détaillé (pathfinding) entre la position actuelle de l'utilisateur et le parking sélectionné.
- **Utilité** : Aider les utilisateurs à se diriger facilement vers le parking ou la station de vélo, sans avoir à basculer entre plusieurs applications.
- **Implémentation** : Intégrer une API de cartographie avec pathfinding (par exemple Google Maps ou OpenStreetMap) pour guider les utilisateurs du point A au point B.

### 7. Proposer un choix de trajet depuis la position utilisateur

- **Description** : En plus du pathfinding, offrir plusieurs options d'itinéraires en fonction des préférences de l'utilisateur, par exemple un trajet plus rapide, un trajet avec moins de trafic, ou un trajet plus écologique.
- **Utilité** : Donner plus de flexibilité aux utilisateurs sur le choix du chemin qu'ils souhaitent emprunter.
- **Implémentation** : Utiliser une API de routage qui propose plusieurs itinéraires alternatifs et afficher ces options dans l'interface utilisateur.

### 8. S'étendre au-delà de Montpellier

- **Description** : Actuellement centré sur Montpellier, l'application pourra étendre ses services à d'autres villes en intégrant de nouvelles données de stationnements et de vélos disponibles dans ces régions.
- **Utilité** : Offrir une couverture plus large pour attirer des utilisateurs dans d'autres villes, en augmentant la portée de l'application.
- **Implémentation** : Intégrer les API et données de parking et vélos de nouvelles villes. Chaque ville pourrait avoir son propre sous-ensemble d'informations et de services spécifiques.

---

Ces fonctionnalités futures vont considérablement enrichir **ParkBuster** en améliorant l'expérience utilisateur et en proposant des services personnalisés, accessibles et extensibles à l’échelle nationale ou internationale.
