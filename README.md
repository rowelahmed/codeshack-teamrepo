# ◈ Ledger — Expense Tracker

A clean, modern, and responsive expense tracker dashboard designed to help users monitor their income, expenses, savings, and financial activity in one place.

## 📌 Project Overview

Ledger is a personal finance dashboard that provides a simple way to visualize financial activity. It includes a monthly financial summary, cash flow charts, category-wise spending breakdowns, and a transaction management interface.

Users can add income or expense transactions, search transaction records, and filter their financial activity through an intuitive dashboard.

## ✨ Features

- **Dashboard Overview** — View available balance, total income, total expenses, and savings rate.
- **Cash Flow Analytics** — Visualize income and expenses over the last six months.
- **Category-wise Spending** — Understand spending patterns across different categories.
- **Transaction Management** — Add income and expense transactions through a modal form.
- **Search Transactions** — Search for transactions using the search field.
- **Transaction Filtering** — Filter transactions and clear filters when needed.
- **Responsive Interface** — Clean dashboard layout designed for convenient navigation.
- **Financial Summary** — Display key financial metrics and savings progress.

## 🛠️ Technologies Used

- **HTML5** — Structures the dashboard and transaction form.
- **CSS3** — Provides styling, layout, colors, and responsive design.
- **JavaScript** — Handles dashboard interactions and transaction functionality.

## 📂 Project Structure

```text
ledger-expense-tracker/
├── index.html
├── styles.css
├── app.js
└── README.md
```

- `index.html` — Contains the dashboard layout, navigation, summary cards, charts, transaction table, and add-transaction dialog.
- `styles.css` — Contains the visual styling and responsive layout.
- `app.js` — Intended for transaction handling, dashboard updates, search, filtering, and chart rendering.
- `README.md` — Documents the project, its features, and setup instructions.

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code.

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Open the project folder:

   ```bash
   cd ledger-expense-tracker
   ```

3. Open the folder in Visual Studio Code.

4. Open `index.html` in your browser, or use the **Live Server** extension for a convenient local development experience.

## 💡 How It Works

1. Open the dashboard to view the financial summary.
2. Select **Add transaction** to open the transaction form.
3. Choose whether the transaction is income or an expense.
4. Enter the description, amount, category, and date.
5. Save the transaction and view it in the dashboard.
6. Use the search and filtering controls to find specific transactions.
7. Review the charts and summary metrics to understand financial activity.

*Note: The actual functionality depends on the JavaScript implementation in `app.js`.*

## 🔮 Future Enhancements

- Backend integration using Java or another backend technology.
- Database integration for persistent transaction storage.
- User authentication and individual user accounts.
- Monthly and yearly financial reports.
- Custom categories and payment methods.
- Budget setting and spending alerts.
- Export transactions to CSV or PDF.
- Improved mobile and tablet experience.

## 👥 Team Collaboration

This project can be developed collaboratively using Git and GitHub.

Team members can work on separate features, create feature branches, submit pull requests, and review code before merging changes into the main branch.

## 📄 License

This project is intended for educational and personal project development. Add a license if you plan to distribute it publicly.

















# Codeshack Team Repository 
This CSS file defines the styling and layout of the Expense Tracker frontend. It provides a modern, clean, and responsive dashboard design with styled cards, transaction 
<br/>
tables, charts, forms, buttons, and category filters. It ensures consistent colors, spacing, typography, and visual effects to create a user-friendly interface across
<br/>
different screen sizes.
<br/>

**Key Features:**

<br/>
- Modern dashboard layout and styling
- <br/>
- Responsive design for different screen sizes
- <br/>
- Styled income and expense summary cards
- <br/>
- Consistent typography, colors, and spacing
- <br/>
- Enhanced form inputs, buttons, and transaction tables
- <br/>
- Hover effects and visual improvements for better usability



JavaScript Functionality

 The JavaScript handles the logic and interactivity of the Expense Calculator. It manages transactions, calculates financial summaries, and dynamically updates the dashboard

**Key features:

- Adds and manages income and expense transactions
- Calculates total income, expenses, balance, and savings rate
- Provides transaction search and category filtering
- Stores transaction data using Local Storage
- Generates category-wise spending and cash-flow statistics
- Dynamically updates the transaction list and dashboard
- Validates user inputs and formats dates and currency
- Includes a custom 404 error page for broken links
