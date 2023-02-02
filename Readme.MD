
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
Pour se baser sur une base de données

# Exercices

### Ex 1
db.salles.find( { smac: true}, { nom: 1, _id:0})

Affiche l'id et le nom des salles qui sont des SMAC.

Résultat type :
```
{
  nom: 'Paloma'
}
```

### Ex 2
db.salles.find( { capacite : { $gt: 1000}}, { nom: 1, _id:0})

Cette requête récupère les salles avec une capacité strictement supérieure à 1000

Résultat type :
```
{
  nom: 'Paloma'
}
```

### Ex 3
db.salles.find({"adresse.numero": {$exists: false}}, {"nom":1})

Cette requête récupère documents dont les adresses ont un champ numéro vide.

Résultat type :
```
{
  _id: 3,
  nom: 'Sonograf'
}
```

### Ex 4
db.salles.find({"avis": {$size: 1}}, {"nom":1})

Cette requête récupère les salles qui ont exactement un avis.

Résultat type :
```
{
  _id: 2,
  nom: 'Paloma'
}
```

### Ex 5
db.salles.find({"styles.": {$eq: "blues"}}, {"styles":1})

Cette requête récupère les salles qui programment du blues.

Résultat type :
```
{
  _id: 3,
  styles: [
    'blues',
    'rock'
  ]
}
```

### Ex 6
db.salles.find({"styles.0": {$eq: "blues"}}, {"styles":1})

Cette requête récupère les salles qui sont en première position dans le tableau styles "blues"

Résultat type :
```
{
  _id: 3,
  styles: [
    'blues',
    'rock'
  ]
}
```

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

### Ex 12
db.salles.find({ smac: true, $where: ("this.styles?.length >= 2")}, {  _id:0, nom: 1})

Permet d'avoir les salles qui ont au moins deux styles de musique différents

### Ex 13
db.salles.find({}, {_id: 0, "adresse.codePostal": 1})

Permet d'avoir les codes postaux de toutes les salles

### Ex 14
db.salles.updateMany({}, {$inc: {"capacite": 100}})

Permet d'incrémenter la capacité de toutes les salles de 100.

### Ex 15
db.salles.updateMany({"styles": {$ne: "jazz"}}, {$push: {"styles": "jazz"}})

Met à jour toutes les salles qui n'ont pas le jazz, en ajoutant le jazz 

### Ex 16
db.salles.updateMany({"_id": {$nin: [2, 3]}, "styles": "funk"}, {$pull: {"styles": "funk"}})

Met à jour toutes les salles en enlevant funk à celles qui n'ont pas l'id 2 ni 3.

### Ex 17
db.salles.updateOne({"_id": 3}, {$addToSet: { "styles": { $each: ["techno", "reggae"] } }})
Ajout de techno et reggae à la salle 3

### Ex 18
db.salles.updateMany({ nom: { $regex: /^p/i } },{ $inc: { capacite: 150 },$push: { contact: {telephone: "04 11 94 00 10"} }})

### Ex 19
db.salles.updateMany({ "nom": { "$regex": /^[^aeiou]+$/i } },{ "$addToSet": {"avis": {"date": new Date(),"note": 10}} })
Met à jour toutes les salles commençant par une voyelle, en ajoutant un avis 10/10

### Ex 20
db.salles.updateMany({ "nom": { "$regex": /^[zZ]/ } },{ "$set": {"nom": "Pub Z","capacite": 50,"smac": false} },{ "upsert": true })
Met à jour toutes les salles commençant par z ou Z avec les données $set

### Ex 21
db.salles.count({ "_id": { "$type": "objectId" } })
Cette requête comptera le nombre de documents dans les salles où le champ "_id" a un type "objectId".

### Ex 22
db.salles.find().sort({capacity: -1}).limit(1).pretty()