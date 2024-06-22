const { getData } = require("../utils/getData");

const data = getData();

exports.controlId = (req, res, next) => {
  // id'si bilenen tarifi bul.
  const recipe = data.find((i) => i.id === req.params.id);

  // Tarif dizide yoksa hata gönder.
  if (!recipe) {
    return next(
      res.status(404).json({ message: "Aradığınız id'li eleman bulunamadı." })
    );
  }

  // Tarif bilgilerinin middleware'den bir sonraki adımda
  // erişilebilir olması için req'in içerisine veriyi ekle.
  req.recipe = recipe;

  // Bulunursa bir sonraki adıma geç.
  next();
};
