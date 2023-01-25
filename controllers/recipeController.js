const Recipe = require('../models/Recipe')

// Show all recipes

const index_get = (req, res) => {
    Recipe.find().sort({createdAt: -1})
        .then((result) => {
            res.render("recipes/homeAuth", {
                title: "Home",
                cssFile: "../css/homeLogged.css",
                recipes: result
            })
        })
        .catch((err) => console.log(err))
   
}

// Create recipe

const create_get = (req, res) => {
    res.render("recipes/create", {
        title: "Create",
        cssFile: "../css/create.css"
    })
}

const create_post = (req, res) => {
    const recipe = new Recipe(req.body);

    recipe.save()
        .then((result) => {
            res.redirect("/homeLogged")
        })
        .catch((err) => console.log(err))
}

// Recipe in detail

const details = (req, res) => {
    const id = req.params.id 
    Recipe.findById(id)
        .then((result) => {
            res.render("recipes/details", {
                title: "Detail",
                cssFile: "../css/detail.css",
                recipe: result
            })
        })
        .catch((err) => console.log(err))
}

// Delete Recipe

const delete_recipe = (req, res) => {
    const id = req.params.id
    Recipe.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: "/homeLogged"})
        })
        .catch((err) => console.log(err))
}



module.exports = {
    index_get,
    create_get,
    create_post,
    details,
    delete_recipe,
}