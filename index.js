const express = require("express");
const hbs = require("hbs");
const waxOn = require("wax-on");
require("dotenv").config();

const app = express();

app.set("view engine", "hbs");

waxOn.on(hbs.handlebars);
waxOn.setLayoutPath("./views/layouts");
app.use(express.static("public"));

//enable form
app.use(express.urlencoded({ extended: false }));

//import in the routes
const landingRoutes = require("./routes/landing");
const productRoutes = require("./routes/products");
async function main() {
  app.get("/", (req, res) => {
    res.redirect("/landing");
  });

  //append the landing url to the /landing/about-us
  // /landing is the url pre-fix
  app.use("/landing", landingRoutes);
  app.use("/products", productRoutes);
}

main();

app.listen(3000, function (req, res) {
  console.log("server has started");
});
