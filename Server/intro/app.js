// const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
// let categories = JSON.parse(fs.readFileSync("categoryData.json", "utf-8"));
// let navbar = JSON.parse(fs.readFileSync("navbar.json", "utf-8"));
// let product = JSON.parse(fs.readFileSync("product.json", "utf-8"));
// let plusCart = JSON.parse(fs.readFileSync("plusCart.json", "utf-8"));
let relatedProduct = JSON.parse(
  fs.readFileSync("related-Product.json", "utf-8")
);
let table = JSON.parse(fs.readFileSync("table.json", "utf-8"));

let updatedPlusCart = (plusCart) => {
  fs.writeFileSync("plusCart.json", JSON.stringify(plusCart));
};

const app = express();

const bodyParser = require("body-parser");

// const jsonParser = bodyParser.json();

app.use(cors());
app.use(express.json());

const port = 8000;

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.get("/table", (req, res) => {
  res.json(table);
});
app.get("/category", (req, res) => {
  res.json(categories);
});

app.get("/navbar", (req, res) => {
  res.json(navbar);
  // response.status(200);
  // response.json(categories);
});
app.get("/product", (req, res) => {
  res.json(product);
});
app.get("/plusCart", (req, res) => {
  res.json(plusCart);
});
app.get("/plusCart/:id", (req, res) => {
  const { id } = req.params;
  let filteredCart = product.find((item) => {
    return item.id == id;
  });
  res.json(filteredCart);
  console.log(filteredCart);
});

app.post("/plusCart", (req, res) => {
  const { item } = req.body;
  plusCart.push(item);
  fs.writeFileSync("plusCart.json", JSON.stringify(plusCart));
  console.log(item);
});
app.delete("/plusCart/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  plusCart = plusCart.filter((item) => {
    return item.id !== Number(id);
  });
  updatedPlusCart(plusCart);
  res.json(id);
  // console.log(id);
  res.status(200).send("Item deleted successfully");
});

app.delete("/plusCart", (req, res) => {
  // delete all items from database
  plusCart = plusCart.filter((item) => {
    return item.id !== item.id;
  });
  updatedPlusCart(plusCart);
});
app.get("/relatedProduct", (req, res) => {
  res.json(relatedProduct);
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
