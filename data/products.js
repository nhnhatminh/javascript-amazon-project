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

export async function loadProductsFetch() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const productsData = await response.json();

    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    return products;
  } catch (error) {
    console.error('Error loading products from Node.js REST API:', error);
  }
}