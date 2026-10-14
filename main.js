import { fetchExchangeRates } from "./api.js";
import { getState, setRates, setHomeCurrency, setCategoryFilter, setStatus, addExpense, deleteExpense } from "./state.js";
import { renderApp } from "./ui.js";

async function init() {
  setStatus(true, null);
  renderApp(getState(), handleHeaderDelete);

  try {
    const rates = await fetchExchangeRates();
    setRates(rates);
    setStatus(false, null);
  } catch (error) {
    // Fallback static rates if fetch fails so UI doesn't silently break
    const fallbackRates = { USD: 1, EUR: 0.92, GBP: 0.79, KES: 129.5 };
    setRates(fallbackRates);
    setStatus(false, error.message);
  }
  
  renderApp(getState(), handleHeaderDelete);
  setupListeners();
}

function handleHeaderDelete(id) {
  deleteExpense(id);
  renderApp(getState(), handleHeaderDelete);
}

function setupListeners() {
  const form = document.getElementById("expenseForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const currency = document.getElementById("currency").value;
    const category = document.getElementById("category").value;

    const newExpense = {
      id: Date.now().toString(),
      description,
      amount,
      currency,
      category
    };

    addExpense(newExpense);
    form.reset();
    renderApp(getState(), handleHeaderDelete);
  });

  document.getElementById("homeCurrency").addEventListener("change", (e) => {
    setHomeCurrency(e.target.value);
    renderApp(getState(), handleHeaderDelete);
  });

  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    setCategoryFilter(e.target.value);
    renderApp(getState(), handleHeaderDelete);
  });
}

init();