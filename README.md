# Book.com

A full-stack e-commerce app where you can browse(cart management, wishlist management), search, order, and view detailed information about books.  
Built with a React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://books-com.vercel.app/)

---

## Quick Start

```
git clone https://github.com/sourjyendu-barik/books.com.git
cd <your-repo>
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- Cloudinary

## Demo Video

Watch a walkthrough (15 minutes) of all major features of this app:
[Explanation Video Link](https://drive.google.com/file/d/1PRRAZNZkE5t93Kf-DSt1iaFgtly_hJeG/view)

## Features

**Home**

- Displays category-based book collections (Math, Science, History, Geography etc.)
- Search books by title in real time and view all books in one place

**Book Listing**

- Browse all books with price, rating, and category filters
- Search,filter and sort books in real time for quick discovery

**Book Details**

- View full book information (name, author, rating, discount, return policy, delivery option, description etc.)
- Get similar books recommendation

**Wishlist Management**

- Maintain a wishlist of favorite books with price and rating info
- Quickly move saved books from wishlist to cart for purchase

**Cart Management**

- Manage cart items with quantity controls, per-item discounts, and wishlist moves
- View detailed price summary with savings, delivery charges, and a final “Place Order” checkout action

**Order Management**

- Checkout summary with total items, discounts, delivery charges, and final payable amount
- Manage delivery addresses and confirm order with a single “Place Order” action

## API Reference

### **Get /api/products**<br>

List all books<br>
Sample Response:<br>
`[{ _id, id, name, image, category, price, deliveryCharges...}, …]`

### **GET /api/products/:id**<br>

Get details for one book<br>
Sample Response:<br>
`{ _id, id, name, image, category, price, deliveryCharges...}`

## Contact

For bugs or feature request please reach out to sourjyendubarik7798@gmail.com

