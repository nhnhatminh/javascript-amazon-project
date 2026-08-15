const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://amazon-api.duckdns.org';

export let products = [];

export async function loadProductsFetch() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);

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