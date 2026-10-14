export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    return 0;
  }
  // Base rates are USD-anchored
  const amountInUSD = amount / rates[fromCurrency];
  const converted = amountInUSD * rates[toCurrency];
  return Number(converted.toFixed(2));
}

export function calculateTotal(expenses, homeCurrency, rates) {
  return expenses.reduce((sum, exp) => {
    const converted = convertCurrency(exp.amount, exp.currency, homeCurrency, rates);
    return sum + converted;
  }, 0);
}

export function filterExpenses(expenses, category) {
  if (!category || category === "ALL") {
    return expenses;
  }
  return expenses.filter(exp => exp.category === category);
}