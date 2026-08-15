export let products = [];

export async function loadProductsFetch() {
  try {
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const productsData = await response.json();

    products = productsData;

    return products;
  } catch (error) {
    console.error('Error loading products from Node.js REST API:', error);
    return [];
  }
}

export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}