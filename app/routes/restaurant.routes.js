module.exports = app => {
    const restaurant = require("../controllers/restaurant.controller.js");

    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", restaurant.create);

    // Retrieve all restaurant
    router.get("/", restaurant.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", restaurant.findOne);

    // Update a Restaurant with id
    router.put("/:id", restaurant.update);

    // Delete a Restaurant with id
    router.delete("/:id", restaurant.delete);

    // Create a new Restaurant
    router.delete("/", restaurant.deleteAll);

    app.use("/api/restaurants", router);
};
