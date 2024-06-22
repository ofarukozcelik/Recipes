const express = require("express");
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipeControllers");
const { controlId } = require("../middleware");

// Router > Server.js dosyası dışında route tanımı yapmamıza olanak sağlar.
const router = express.Router();

// Oluşturduğumuz Router'ın yollarını ve çalışacak fonksyonlarını tanımlama.
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router
  .route("/api/recipes/:id")
  .get(controlId, getRecipe)
  .delete(controlId, deleteRecipe);

// Server'da kullanmak için export et.
module.exports = router;
