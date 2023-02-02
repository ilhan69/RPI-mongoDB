Le jeu de données météo a été téléchargé sur kaggle.

### Données CSV
Le fichier CSV a été converti en data JSON grâce au script nodeJS csvToJson.js. Cela permet de s'assurer de bien préparer les données.

### Import des données dans la base de données
mongoimport --db tpMeteo --collection delhiMeteo --file data.json --jsonArray

Transformation des colonnes datetime_utc en objet date :

db.delhiMeteo.updateMany(
  {},
  [
    {
      $set: {
        datetime_utc: {
          $dateFromString: {
            dateString: "$datetime_utc",
            format: "%Y%m%d-%H:%M"
          }
        },
      }
    }
  ]
)


### Création de l'index
https://www.mongodb.com/docs/manual/reference/command/listIndexes/

use tpMeteo
db.delhiMeteo.createIndex({'datetime_utc': 1})
#### Vérification de l'index
db.runCommand ( { listIndexes: "delhiMeteo"} )

### Réalisation des requêtes
1) Récupération des documents dont la date est située entre juin et août, avec une température > 25 degrés, trié par la pression atmosphérique

```
db.delhiMeteo.find({
$and: [
{ $where: "return (this.datetime_utc.getMonth() >= 5 && this.datetime_utc.getMonth() <= 9)" },
{ "_tempm": { $gt: 25 } }
]
}).sort({ "_pressurem": -1 })
```

2) Calcul des températures moyennes, pour chaque mois de chaque année
```
db.delhiMeteo.aggregate([
   {
      $match: {
         $expr: {
            $in: [
               {$month: "$datetime_utc"},
               [6, 7, 8, 9]
            ]
         }
      }
   },
   {
      $group: {
         _id: {
            $dateToString: {
               date: {
                  $toDate: "$datetime_utc"
               },
               format: "%Y-%m"
            }
         },
         avgTemp: { $avg: "$_tempm" }
      }
   },
   {
      $sort: {
         "_id": 1
      }
   }
])
```

2.b) Récupération de la moyenne des températures de juin à septembre
db.delhiMeteo.aggregate([
   {
      $match: {
         $expr: {
            $in: [
               {$month: "$datetime_utc"},
               [6, 7, 8, 9]
            ]
         }
      }
   },
   {
      $group: {
         _id: {
            $dateToString: {
               date: {
                  $toDate: "$datetime_utc"
               },
               format: "%Y-%m"
            }
         },
         avgTemp: { $avg: "$_tempm" }
      }
   },
   {
      $sort: {
         "_id": 1
      }
   },
   {
      $limit: 1
   }
])

3) Export de la base de données pour un usage ultérieur
```
mongoexport --db tpMeteo --collection delhiMeteo --out delhiMeteo.json
```
