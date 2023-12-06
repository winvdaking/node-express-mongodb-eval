# Evaluation

- Réaliser les commandes permettant de répondre aux filtres demandés sur la base restaurant envoyée

  

# Requêtes

1.  Créez une base restaurants, puis une collection new_york. Utilisez mongoDBCompass pour importer les données dans la collection (voir slides)
   
```js
  use restaurants
```

2.  Sur cette base réalisées les opérations suivantes (ces opérations peuvent être faites en cli) :

- Affichez tous les documents de la collection new_york
  
```js
db.new_york.find()
```

- Comptez le nombre de documents présents dans la collection new_york

```js
db.new_york.countDocuments()
```

- Affichez les documents ayant un restaurant_id >= 3015000

```js
db.new_york.find({ "restaurant_id": { $gte: "3015000" } })
```

- Comptez le nombre de documents récupérés par la requête précédente

```js
db.new_york.find({ "restaurant_id": { $gte: "3015000" } }).count()
```

- Récupérez le premier document qui contient un grade de type A, avec un score supérieur à 10 (Regardez dans mongoDBCompass pour comprendre l’arborescence)

```js
db.new_york.findOne({ "grades": { $elemMatch: { "grade": "A", "score": { $gt : 10 }}}})
```

- Ajoutez (avec $push) au document récupéré précédemment, un nouveau grade de type B et un score de 10 (la date, mettez ce que vous voulez)

```js
db.new_york.updateOne({ "grades": { $elemMatch: { "grade": "A", "score": { $gt : 10 }}}}, { $push : { "grades": { "grade": "B", "score": 10, "date": "2023-12-05"}}})
```

- Incrémenter de 5 le score du premier grade du restaurant ayant pour ‘borough’ : « Brooklyn » et pour ‘cuisine’ : « Hamburgers »

```js
db.new_york.updateOne({ "borough": "Brooklyn", "cuisine": "Hamburger" }, { $inc : { "grades.0.score": 5 }})
```

- Affichez les 10 premiers restaurants par ordre alphabétique de ‘name’
  
```js
db.new_york.find().sort({ "name": 1 }).limit(10)
```

- Trouvez le (ou les) restaurant(s) ayant pour address.coord.coordinates les valeurs :

    - 0 : 73.98513559999999

    - 1 : 40.7676919

```js
db.new_york.find({ "address.coord.0": "73.98513559999999", "address.coord.1": "40.7676919" })
```

- Recherchez les restaurants address.zipcode >= 10500 (afficher UNIQUEMENT ‘name’, ‘cuisine’, ‘restaurant_id’)

```js
db.new_york.find({ "address.zipcode": { $gte: "10500" }}, { "_id":0 , "name": 1, "cuisine": 1, "restaurant_id": 1})
```
- Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades.

```js
db.new_york.updateMany({ "grades": { $size: 1 }}, { $set: { "prime": 1000 } })
```

- (Bonus) Créez une vue avec permettant d’afficher les adresses de tous les restaurants n’ayant qu’un seul grade.

```js
db.createView(
  "restaurantOneGrade",
  "new_york",
  [
    {
      $match: {
        "grades": { $size: 1 }
      }
    },
    {
      $project: {
        "_id": 0,
        "name": 1,
        "address": 1
      }
    }
  ]
)
```
et pour voir la view : 
```js
db.restaurantOneGrade.find()
```
---
Dorian LOPEZ