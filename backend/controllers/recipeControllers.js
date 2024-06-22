const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");
const crypto = require("crypto");

// json dosyasından verileri al.
let data = getData();

exports.getAllRecipes = (req, res) => {
  // Tariflerin bir kopyasını oluştur.
  let recipes = [...data];

  // Aratılan terime eriş.
  const searchTerm = req.query?.title?.trim()?.toLowerCase();

  // Sıralama parametresine eriş.
  const order = req.query.order;

  // Aratılan terim varsa filtreler.
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
  }

  // Order varsa sıralar.
  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  // Cevap gönder.
  res.status(200).json({
    message: "Tarifler başarıyla gönderildi.",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.createRecipe = (req, res) => {

  //1) İsteğin body'si ile gelen veriye eriş.
  const newRecipe = req.body;

  //2) Verinin bütün değerleri tanımlanmışmı kontrol et.
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Lütfen bütün değerleri tanımlayın." });
  }

  //3) Veriye id ekle.
  newRecipe.id = crypto.randomUUID();

  //4) Yeni tarifi diziyi ekle.
  data.push(newRecipe);

  //5) Yeni diziyi json dosyasına yaz.
  setData(data);

  //6) Cevap gönder.
  res.status(200).json({ message: "Yeni tarif oluşturuldu.", recipe: data });
};

exports.getRecipe = (req, res) => {
  
  res.status(200).json({
    message: "Aradığınız tarif bulundu.",
    recipe: req.recipe,
  });
};

exports.deleteRecipe = (req, res) => {
  // Silinecek elemanın sırasını bul.
  const index = data.findIndex((i) => i.id == req.params.id);

  // Sırası bilinen elemanı diziden kaldır.
  data.splice(index, 1);

  // json dosyasını güncelle.
  setData(data);

  // Cevap gönder.
  res.status(204).json({ message: "Başarıyla silindi." });
};
