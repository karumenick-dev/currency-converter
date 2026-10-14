import { convertCurrency, calculateTotal, filterExpenses } from "../src/utils.js";

const mockRates = {
  USD: 1,
  EUR: 0.9,
  KES: 130
};

describe("Utility Functions Unit Tests", () => {
  test("convertCurrency converts correctly between base and target currencies", () => {
    const result = convertCurrency(100, "USD", "EUR", mockRates);
    expect(result).toBe(90);
  });

  test("convertCurrency handles cross-currency conversions accurately", () => {
    // 130 KES -> 1 USD -> 0.9 EUR
    const result = convertCurrency(130, "KES", "EUR", mockRates);
    expect(result).toBe(0.9);
  });

  test("calculateTotal calculates correct total sum converted to home currency", () => {
    const expenses = [
      { amount: 90, currency: "EUR" }, // 100 USD
      { amount: 130, currency: "KES" } // 1 USD
    ];
    const total = calculateTotal(expenses, "USD", mockRates);
    expect(total).toBe(101);
  });

  test("filterExpenses filters by category correctly or returns all when ALL selected", () => {
    const expenses = [
      { id: "1", category: "Food" },
      { id: "2", category: "Transport" },
      { id: "3", category: "Food" }
    ];
    
    expect(filterExpenses(expenses, "Food").length).toBe(2);
    expect(filterExpenses(expenses, "ALL").length).toBe(3);
    expect(filterExpenses(expenses, "Shopping").length).toBe(0);
  });

  test("convertCurrency handles missing rates gracefully with zero output", () => {
    const result = convertCurrency(50, "USD", "UNKNOWN", mockRates);
    expect(result).toBe(0);
  });
});