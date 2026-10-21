const initialTransactions = [
  { id: 1, name: "Whole Foods Market", category: "Groceries", date: "2026-10-15", amount: 86.42, type: "expense", method: "Visa ···· 4829" },
  { id: 2, name: "Monthly salary", category: "Income", date: "2026-10-14", amount: 4850, type: "income", method: "Direct deposit" },
  { id: 3, name: "Blue Bottle Coffee", category: "Dining", date: "2026-10-14", amount: 8.75, type: "expense", method: "Visa ···· 4829" },
  { id: 4, name: "City of Stockholm", category: "Transport", date: "2026-10-13", amount: 42.5, type: "expense", method: "Apple Pay" },
  { id: 5, name: "Netflix subscription", category: "Subscriptions", date: "2026-10-12", amount: 17.99, type: "expense", method: "Visa ···· 4829" },
  { id: 6, name: "Sunday Studio", category: "Shopping", date: "2026-10-11", amount: 126, type: "expense", method: "Visa ···· 4829" },
  { id: 7, name: "Green Kitchen", category: "Dining", date: "2026-10-10", amount: 34.2, type: "expense", method: "Apple Pay" },
  { id: 8, name: "Pharmacy", category: "Health", date: "2026-10-09", amount: 21.4, type: "expense", method: "Visa ···· 4829" },
  { id: 9, name: "Rent payment", category: "Housing", date: "2026-10-03", amount: 1550, type: "expense", method: "Bank transfer" }
];

const categories = ["All", "Groceries", "Dining", "Transport", "Shopping", "Housing", "Health", "Subscriptions", "Income"];
const historic = [ [4210,3020], [4830,3440], [4630,3160], [4970,3780], [4750,3260] ];
const colors = ["#9a8cf3", "#66cda0", "#e88d71", "#71a9dc", "#e4bd68"];

let transactions;
try {
  transactions = JSON.parse(localStorage.getItem("ledger-transactions")) || initialTransactions;
} catch {
  transactions = initialTransactions;
}

let categoryFilter = "All";
let transactionType = "expense";

const searchInput = document.querySelector("#search");
const rowsContainer = document.querySelector("#transaction-rows");
const dialog = document.querySelector("#transaction-dialog");
const form = document.querySelector("#transaction-form");

function formatCurrency(n) {
  return new Intl.NumberFormat("en-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 2 }).format(n);
}

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(isoDate + "T12:00:00"));
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function save() {
  localStorage.setItem("ledger-transactions", JSON.stringify(transactions));
}

function getVisibleTransactions() {
  const q = searchInput.value.trim().toLowerCase();
  return transactions.filter(t => {
    const matchesCat = categoryFilter === "All" || t.category === categoryFilter;
    const matchesSearch = `${t.name} ${t.category}`.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
}

function renderFilters() {
  document.querySelector("#filters").innerHTML = categories.map(cat => `
    <button class="filter ${categoryFilter === cat ? "active" : ""}" data-category="${cat}">
      ${cat}${categoryFilter === cat ? " ✓" : ""}
    </button>
  `).join("");
}

function renderRows() {
  const visible = getVisibleTransactions();
  document.querySelector("#transaction-count").textContent = visible.length;
  document.querySelector("#showing-count").textContent = `Showing ${visible.length} of ${transactions.length} transactions`;

  if (!visible.length) {
    rowsContainer.innerHTML = '<tr><td class="empty" colspan="5">No transactions match your search.</td></tr>';
    return;
  }

  rowsContainer.innerHTML = visible.map(t => `
    <tr>
      <td>
        <div class="transaction-name">
          <span class="transaction-icon">${t.type === "income" ? "↙" : "◈"}</span>
          <span>${escapeHtml(t.name)}<small>${t.type === "income" ? "Money received" : "Card payment"}</small></span>
        </div>
      </td>
      <td><span class="pill">${escapeHtml(t.category)}</span></td>
      <td>${formatDate(t.date)}</td>
      <td>${escapeHtml(t.method)}</td>
      <td class="amount ${t.type === "income" ? "income" : ""}">
        ${t.type === "income" ? "+" : "−"}${formatCurrency(Number(t.amount))}
      </td>
    </tr>
  `).join("");
}

function renderSummary() {
  const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  document.querySelector("#income").textContent = formatCurrency(income);
  document.querySelector("#expenses").textContent = formatCurrency(expenses);
  document.querySelector("#balance").textContent = formatCurrency(balance);
  document.querySelector("#saving-rate").textContent = `${savingsRate}%`;
  document.querySelector("#saving-rate-large").textContent = savingsRate;
  document.querySelector("#tip-savings").textContent = `You’re saving ${savingsRate}% this month.`;
  document.querySelector("#expense-share").textContent = `${income ? Math.round((expenses / income) * 100) : 0}%`;
  document.querySelector("#saving-progress").style.width = `${Math.max(0, Math.min(savingsRate, 100))}%`;

  renderCategoryBreakdown();
  renderCashflow(income, expenses);
}

function renderCategoryBreakdown() {
  const totals = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
  });
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = entries[0]?.[1] || 1;

  document.querySelector("#category-breakdown").innerHTML = entries.map(([name, val], i) => `
    <div class="category-row">
      <i class="category-swatch" style="background:${colors[i]}"></i>
      <span>${escapeHtml(name)}</span>
      <strong>${formatCurrency(val)}</strong>
      <div class="category-track"><i style="width:${(val / max) * 100}%; background:${colors[i]}"></i></div>
    </div>
  `).join("") || "<p>No spending yet.</p>";
}

function renderCashflow(income, expenses) {
  const allMonths = [...historic, [income, expenses]];
  const max = Math.max(...allMonths.flat(), 1);

  document.querySelector("#cashflow-bars").innerHTML = allMonths.map(([inc, exp]) => `
    <div class="bar-pair">
      <i class="bar" style="height:${Math.max(4, (inc / max) * 100)}%; background:#69cfa2" title="Income ${formatCurrency(inc)}"></i>
      <i class="bar" style="height:${Math.max(4, (exp / max) * 100)}%; background:#e88d71" title="Expenses ${formatCurrency(exp)}"></i>
    </div>
  `).join("");
}

function render() {
  renderFilters();
  renderRows();
  renderSummary();
}

// Event Listeners
document.querySelector("#filters").addEventListener("click", e => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  categoryFilter = btn.dataset.category;
  renderFilters();
  renderRows();
});

searchInput.addEventListener("input", renderRows);

document.querySelector("#clear-filters").addEventListener("click", () => {
  categoryFilter = "All";
  searchInput.value = "";
  renderFilters();
  renderRows();
});

document.querySelector("#open-dialog").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
document.querySelector("#cancel-dialog").addEventListener("click", () => dialog.close());

document.querySelectorAll(".type-toggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    transactionType = btn.dataset.type;
    document.querySelectorAll(".type-toggle button").forEach(b => b.classList.toggle("selected", b === btn));
    document.querySelector("#category-field").hidden = transactionType === "income";
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const amount = Number(formData.get("amount"));
  const name = String(formData.get("name")).trim();
  if (!name || !Number.isFinite(amount) || amount <= 0) return;

  transactions.unshift({
    id: Date.now(),
    name,
    amount,
    date: formData.get("date"),
    type: transactionType,
    category: transactionType === "income" ? "Income" : formData.get("category"),
    method: "Added manually"
  });

  save();
  categoryFilter = "All";
  searchInput.value = "";
  form.reset();
  transactionType = "expense";
  document.querySelectorAll(".type-toggle button").forEach((b, i) => b.classList.toggle("selected", i === 0));
  document.querySelector("#category-field").hidden = false;
  dialog.close();
  render();
});

// Set current date in header
document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
}).format(new Date()).toUpperCase();

render();