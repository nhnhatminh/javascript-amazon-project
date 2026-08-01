import { products, loadProductFetch } from '../data/products.js';
import { cart, addToCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let searchTimeoutId;

function renderProductsGrid(productsToRender) {
  let productsHTML = '';

  productsToRender.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select class="js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
    
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}" 
          data-product-name="${product.name}"
        >
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  attachAddToCartEvent();
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

function attachAddToCartEvent() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productName = button.dataset.productName;

      const quantitySelector = document.querySelector(`.js-product-quantity-${productId}`);

      const selectedQuantity = Number(quantitySelector.value);

      addToCart(productId, productName, selectedQuantity);
      updateCartQuantity();
    });
  });
}

function filterAndSortProducts(allProducts) {
  const categoryValue = document.querySelector('.js-category-select').value;
  const sortValue = document.querySelector('.js-sort-select').value;
  const searchTerm = document.querySelector('.search-bar').value.toLowerCase().trim();

  let result = [...allProducts];

  if (categoryValue != 'all') {
    result = result.filter((product) => {
      const matchesKeyword = product.keywords && product.keywords.includes(categoryValue);
      const matchesType = product.type === categoryValue;
      return matchesKeyword || matchesType;
    });
  }

  if (searchTerm != '') {
    result = result.filter((product) => {
      const nameMatches = product.name.toLowerCase().includes(searchTerm);
      const keywordsMatches = product.keywords && product.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm));
      return nameMatches || keywordsMatches;
    });
  }

  if (sortValue === 'price-low-high') {
    result.sort((a, b) => a.priceCents - b.priceCents);
  }
  else if (sortValue === 'price-high-low') {
    result.sort((a, b) => b.priceCents - a.priceCents);
  }
  else if (sortValue === 'rating-high-low') {
    result.sort((a, b) => b.rating.stars - a.rating.stars);
  }

  return result;
}

function attachFilterEvents(allProducts) {
  const searchInput = document.querySelector('.search-bar');
  const categorySelect = document.querySelector('.js-category-select');
  const sortSelect = document.querySelector('.js-sort-select');

  const updateGrid = () => {
    const filteredProducts = filterAndSortProducts(allProducts);
    renderProductsGrid(filteredProducts);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeoutId);
      searchTimeoutId = setTimeout(() => {
        updateGrid();
      }, 300);
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', updateGrid);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', updateGrid);
  }
}

async function initPage() {
  const productsGrid = document.querySelector('.js-products-grid');

  if (productsGrid) {
    productsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; font-size: 18px; padding: 40px;">Loading products, please wait...</div>';
  }

  try {
    const fetchedProducts = await loadProductFetch();

    renderProductsGrid(fetchedProducts);
    updateCartQuantity();

    attachFilterEvents(fetchedProducts);

  } catch (error) {
    if (productsGrid) {
      productsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: red; font-size: 18px; padding: 40px;">Failed to load products. Please check your connection.</div>';
    }
  }
}

initPage();