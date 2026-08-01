export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export let products = [];

export async function loadProductFetch() {
  try {
    const response = await fetch("backend/products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    products = await response.json();
    return products;
  } catch (error) {
    console.log('Failed to fetch products', error);
    throw error;
  }
}