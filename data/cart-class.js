export class Cart {
  #cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.#cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.#cartItems) {
      this.#cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          quantity: 2,
          deliveryOptionId: '1',
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          productName: "Intermediate Size Basketball",
          quantity: 1,
          deliveryOptionId: '2',
        },
      ];
    }
  }

  #saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#cartItems));
  }

  get cartItems() {
    return this.#cartItems;
  }

  addToCart(productId, productName, quantity = 1) {
    let matchingItem;

    this.#cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.#cartItems.push({
        productId: productId,
        productName: productName,
        quantity: quantity,
        deliveryOptionId: '1',
      });
    }

    this.#saveToStorage();
  }

  deleteProductFromCart(productId) {
    const newCart = [];

    this.#cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });

    this.#cartItems = newCart;
    this.#saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.#cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.#saveToStorage();
    }
  }

  calculateCartQuantity() {
    let totalQuantity = 0;

    this.#cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  }
}


export const cart = new Cart('cart-class');