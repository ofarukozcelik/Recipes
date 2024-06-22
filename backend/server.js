const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// İstekteki json verisini işle.
app.use(express.json());

// Cors hataları için.
app.use(cors());

// Route tanımı yap.
app.use(recipeRoutes);

// Dinlenecek portu belirle.
app.listen(4000, () => {
  console.log("Server 4000 portunu dinlemeye başladı");
});
