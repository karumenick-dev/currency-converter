import { calculateTotal } from "./utils.js";

let state = {
  expenses: [],
  homeCurrency: "USD",
  categoryFilter: "ALL",
  rates: {},
  status: { loading: false, error: null }
};

export function getState() {
  return state;
}

export function setRates(rates) {
  state = { ...state, rates };
}

export function setHomeCurrency(homeCurrency) {
  state = { ...state, homeCurrency };
}

export function setCategoryFilter(categoryFilter) {
  state = { ...state, categoryFilter };
}

export function setStatus(loading, error) {
  state = { ...state, status: { loading, error } };
}

export function addExpense(newExpense) {
  // Spread operator requirement: adding item immutably
  state = {
    ...state,
    expenses: [...state.expenses, newExpense]
  };
}

export function deleteExpense(id) {
  state = {
    ...state,
    expenses: state.expenses.filter(exp => exp.id !== id)
  };
}

export function updateExpenseCategory(id, newCategory) {
  // Spread operator requirement: updating field immutably
  state = {
    ...state,
    expenses: state.expenses.map(exp => 
      exp.id === id ? { ...exp, category: newCategory } : exp
    )
  };
}