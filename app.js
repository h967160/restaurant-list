const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

//setting template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// setting static files
app.use(express.static("public"));

//setting routes

// index route
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});
app.get("/restaurants", (req, res) => {
  res.render("index", { restaurants: restaurants });
});

// search route
app.get("/search", (req, res) => {
  const keywords = req.query.keyword?.trim().toLowerCase();
  const matchedRestaurants = restaurants.filter(
    (rest) =>
      rest.name.toLowerCase().includes(keywords) ||
      rest.category.toLowerCase().includes(keywords)
  );
  res.render("index", { restaurants: matchedRestaurants, keywords });
});

// detail route
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rest) => rest.id.toString() === id);
  res.render("detail", { restaurant: restaurant });
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
