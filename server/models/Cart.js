let cart = [];

exports.getCart = () => cart;

exports.add = (product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
};

exports.remove = (id) => {
  cart = cart.filter((item) => item.id !== parseInt(id));
};

exports.clear = () => {
  cart = [];
};
