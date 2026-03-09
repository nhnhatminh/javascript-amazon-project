export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      quantity: 1,
      deliveryOptionId: '1',
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      productName: "Intermediate Size Basketball",
      quantity: 1,
      deliveryOptionId: '2',
    },
  ]
};

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productName) {
  let matchingItem;

  cart.forEach((item) => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  })

  if(matchingItem) {
    matchingItem.quantity += 1;
  }
  else {
    cart.push({
      productId: productId,
      productName: productName,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToLocalStorage();
}

export function deleteProductFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if(productId != cartItem.productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;

  saveToLocalStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}