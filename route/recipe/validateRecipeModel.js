var Validator = require('jsonschema').Validator;
var recipeSchema = require('../../schema/recipe.json');

function validateRecipeModel(req, res, next) {
    var v = new Validator();
    var recipeModel = req.body;
    var result = v.validate(recipeModel, recipeSchema)
    console.log(result);
    if (result.valid) {
        next();
    } else {
        res.json(result.errors);
    }

}
module.exports = validateRecipeModel;