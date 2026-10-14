import { filterExpenses, calculateTotal, convertCurrency } from "./utils.js";

export function renderApp(state, onDelete) {
  const { expenses, homeCurrency, categoryFilter, rates, status } = state;
  
  // Render Status / Errors
  const statusEl = document.getElementById("statusMessage");
  if (status.loading) {
    statusEl.textContent = "Fetching live exchange rates...";
    statusEl.className = "loading";
    statusEl.classList.remove("hidden");
  } else if (status.error) {
    statusEl.textContent = `Error: ${status.error}. Displaying fallback mode.`;
    statusEl.className = "error";
    statusEl.classList.remove("hidden");
  } else {
    statusEl.classList.add("hidden");
  }

  // Filter and display expenses
  const filtered = filterExpenses(expenses, categoryFilter);
  const listEl = document.getElementById("expenseList");
  
  if (filtered.length === 0) {
    listEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No expenses found.</p>`;
  } else {
    listEl.innerHTML = filtered.map(exp => {
      const convertedVal = convertCurrency(exp.amount, exp.currency, homeCurrency, rates);
      return `
        <div class="expense-item">
          <div class="expense-info">
            <h4>${escapeHTML(exp.description)}</h4>
            <p><span class="badge">${exp.category}</span></p>
          </div>
          <div class="expense-actions">
            <div class="expense-amounts">
              <div class="converted">${homeCurrency} ${convertedVal.toFixed(2)}</div>
              <div class="original">(${exp.currency} ${Number(exp.amount).toFixed(2)})</div>
            </div>
            <button class="btn-delete" data-id="${exp.id}" title="Delete expense">&times;</button>
          </div>
        </div>
      `;
    }).join("");

    // Bind delete buttons
    listEl.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        onDelete(btn.getAttribute("data-id"));
      });
    });
  }

  // Render Total
  const total = calculateTotal(expenses, homeCurrency, rates);
  document.getElementById("runningTotal").textContent = `${homeCurrency} ${total.toFixed(2)}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}