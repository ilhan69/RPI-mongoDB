
# Mongo DB

## Définition
MongoDB est une base de données noSQL basée sur des documents utilisant le format JSON. Aucune structure n'est imposée.
La documentation est disponible sur : https://www.mongodb.com/docs/

## Avantages
On peut y stocker de gros volumes de données, sous forme d'objet.

## Inconvénients
Les informations peuvent être dupliquées facilement


## Commandes

```use```
Pour créer une nouvelle base de données

# Exercices
# Exercices

### Ex 1
Affiche l'id et le nom des salles qui sont des SMAC.
db.salles.find( { smac: true}, { nom: 1, _id:0})

### Ex 2
db.salles.find( { capacite : { $gt: 1000}}, { nom: 1, _id:0})
Cette requête récupère les salles avec une capacité strictement supérieure à 1000

### Ex 3
db.salles.find({"adresse.numero": {$exists: false}}, {"nom":1})

Cette requête récupère documents dont les adresses ont un champ numéro vide.

### Ex 4
db.salles.find({"avis": {$size: 1}}, {"nom":1})
Cette requête récupère les salles qui ont exactement un avis.

### Ex 5
db.salles.find({"styles.": {$eq: "blues"}}, {"styles":1})
Cette requête récupère les salles qui programment du blues.

### Ex 6
db.salles.find({"styles.0": {$eq: "blues"}}, {"styles":1})
Cette requête récupère les salles qui sont en première position dans le tableau styles "blues"

### Ex 7 
db.salles.find( { "codePostal": { "$regex": "^84" }, "capacite": { "$lt": 500 } }, { "ville": 1 } )
Cette requête récupère les villes qui ont un code postal commençant par 84 et avec une capacité inférieure à 500

### Ex 8

db.salles.find({"avis": {$exists: false}, "_id": {$mod: [2, 0]}}, {"nom": 1})
Cette requête récupère les salles qui ont un id pair et aucun d'avis

### Ex 9
db.salles.find({"avis.note": {$gte :8}, "avis.note": {$lte: 10}}, {"_id": 1})
Permet de trouver les salles dont les avis sont compris entre 8 et 1 inclus

### Ex 10
db.salles.find({"avis.date": {$gt: ISODate("2019-11-15")}}, {"nom": 1})

Permet de trouver les salles qui ont un avis datant d'avant le 15 11 2019.

### Ex 11
db.salles.find({$expr: {$gt: [{$multiply: ["$_id", 100]}, "$capacite"]}}, {nom: 1, capacite: 1})
Permet d'avoir les salles dont l'id multiplié par 100 est supérieur a la capacité
# Lexique

Document : ensemble de données clé => valeur, très proche du js.

Schéma : il est dynamique

Collection : permet de stocker des documents de manière logique comme une table. schéma adaptable.