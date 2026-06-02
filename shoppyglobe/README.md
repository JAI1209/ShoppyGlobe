# ✦ ShoppyGlobe

A modern, responsive e-commerce application built with **React + Vite**, featuring Redux state management, dynamic routing, lazy loading, and a complete checkout flow.

> **Repository:** https://github.com/JAI1209/ShoppyGlobe

---

## 🚀 Features

- **Product Catalog** — Fetches 100+ products from [DummyJSON](https://dummyjson.com/products) with search filtering
- **Product Detail** — Full product pages with image galleries, ratings, and specs
- **Shopping Cart** — Add, remove, increase/decrease quantity with live totals
- **Checkout** — Validated form with order summary, free-shipping threshold, and post-order redirect
- **Redux State** — Cart and search state managed with Redux Toolkit
- **Code Splitting** — All pages lazy-loaded with React.lazy + Suspense
- **Responsive UI** — Mobile-first design that works on all screen sizes
- **Error Handling** — Graceful loading/error states throughout

---

## 🗂️ Folder Structure

```
shoppyglobe/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx / Header.css
│   │   ├── ProductItem.jsx / ProductItem.css
│   │   └── CartItem.jsx / CartItem.css
│   ├── hooks/           # Custom React hooks
│   │   └── useProducts.js
│   ├── pages/           # Page-level components
│   │   ├── ProductList.jsx / ProductList.css
│   │   ├── ProductDetail.jsx / ProductDetail.css
│   │   ├── Cart.jsx / Cart.css
│   │   ├── Checkout.jsx / Checkout.css
│   │   └── NotFound.jsx / NotFound.css
│   ├── redux/           # Redux Toolkit store & slices
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── searchSlice.js
│   ├── routes/          # React Router configuration
│   │   └── AppRouter.jsx
│   ├── styles/          # Global CSS variables & resets
│   │   └── global.css
│   ├── App.jsx          # Root component with Redux Provider
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| Vite 5 | Build tool & dev server |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| DummyJSON API | Product data source |

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/JAI1209/ShoppyGlobe.git
cd shoppyglobe

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📦 Redux State Shape

```js
{
  cart: {
    items: [
      { id, title, price, thumbnail, category, quantity }
    ]
  },
  search: {
    query: ""
  }
}
```

### Cart Actions
| Action | Description |
|--------|-------------|
| `addToCart(product)` | Add product or increment quantity |
| `removeFromCart(id)` | Remove product entirely |
| `incrementQuantity(id)` | +1 quantity |
| `decrementQuantity(id)` | -1 quantity (min: 1) |
| `clearCart()` | Empty the cart |

### Search Actions
| Action | Description |
|--------|-------------|
| `setSearchQuery(query)` | Set search filter |
| `clearSearch()` | Reset search |

---

## 🗺️ Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | ProductList | Home — product grid with search |
| `/product/:id` | ProductDetail | Individual product detail page |
| `/cart` | Cart | Cart management |
| `/checkout` | Checkout | Checkout form & order placement |
| `*` | NotFound | 404 catch-all |

---

## 🎨 Design System

The UI uses CSS custom properties for a consistent design language:

- **Fonts:** Playfair Display (display) + DM Sans (body)
- **Primary accent:** `#c4783c` (warm amber/terracotta)
- **Background:** `#faf8f5` (warm off-white)
- **Responsive breakpoints:** 480px, 640px, 768px, 900px

---

## 🧩 Performance Optimizations

- **Code splitting** — Each page is a separate JS chunk via `React.lazy()`
- **Suspense boundaries** — Pages show a spinner while their chunk loads
- **Lazy image loading** — All `<img>` tags use `loading="lazy"`
- **AbortController** — Fetch requests are cancelled on component unmount
- **useMemo** — Search filtering is memoized to avoid re-computation

---
git commits 
https://github.com/JAI1209/ShoppyGlobe/commits/main/


1. 06f68f9faea62bfdd0829d432f2de6714ca4ed0f
2. 569d28f7638cc7edfb2c1d384753dcd01f93af1b
3. e46d3eb1c3f74b1e63b3465c36238a0f275e2c08
4. 1c5ea367f28a06c0b4f5890e5ca4f4784af256f9
5. 555f094051e9387b0d1451d0009a94c270099abc
6. 5da6d601b8b50ebad5363f50b96dfba29c5e189b
7. 7333c85205f0d6d96cc0504e9ecaf162a0496014
8. 2e07d83f047a2baceef5bb037193014372c7c4c1
and till 18 commits of 25 you can tap commits link

## 📄 License

MIT — feel free to use this project for learning and portfolio purposes.


#screenshots 

![alt text](image.png)