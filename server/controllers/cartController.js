const Cart = require("../models/Cart");

exports.getCart = (req, res) => {
  res.json(Cart.getCart());
};

exports.addToCart = (req, res) => {
  const product = req.body;
  Cart.add(product);
  res.json({ message: "Producto agregado al carrito" });
};

exports.removeFromCart = (req, res) => {
  const id = req.params.id;
  Cart.remove(id);
  res.json({ message: "Producto eliminado del carrito" });
};

exports.clearCart = (req, res) => {
  Cart.clear();
  res.json({ message: "Carrito vaciado" });
};
