import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";

async function loadCheckoutPage() {
  try {
    await loadProductFetch();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.error("Error loading checkout page", error);
  }
}

loadCheckoutPage();