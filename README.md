# MarketLens 📈

A personal portfolio analytics dashboard built with React that allows users to search stocks, track their holdings, monitor portfolio performance, and visualize portfolio allocation.

MarketLens combines real-time market data with user-defined portfolio information to provide a simple and interactive investment dashboard.

---

## 🚀 Features

### Stock Search
- Search for stocks using company names or ticker symbols
- Search results powered by Finnhub API
- Select a stock from the search results
- Fetch the latest market price

### Portfolio Management
- Add stocks to your portfolio
- Enter number of shares
- Enter purchase price
- Delete holdings
- Prevent duplicate holdings

### Portfolio Analytics
- Total invested value
- Current portfolio value
- Total profit/loss
- Overall return percentage
- Individual stock profit/loss
- Individual stock return percentage
- Best performing holding
- Worst performing holding

### Portfolio Visualization
- Portfolio allocation chart
- Visual representation of holdings based on current value

### Persistence
- Portfolio data stored using browser LocalStorage
- Holdings remain available after refreshing the page

### UI & UX
- Responsive dashboard
- Loading states
- Error handling
- Clean component-based React architecture

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| Finnhub API | Stock market data |
| Recharts | Data visualization |
| LocalStorage | Client-side persistence |
| Vite | Development & build tool |
| Vercel | Deployment |

---

## 🏗️ Project Structure

```text
src/
│
├── components/
│   ├── AllocationChart.jsx
│   ├── HoldingForm.jsx
│   ├── HoldingsTable.jsx
│   ├── Navbar.jsx
│   ├── PerformanceCard.jsx
│   ├── StockSearch.jsx
│   └── SummaryCards.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── services/
│   └── marketApi.js
│
├── utils/
│   ├── Calculations.js
│   └── storage.js
│
├── App.jsx
├── index.css
└── main.jsx
