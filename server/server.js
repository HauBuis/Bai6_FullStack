const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Hoa hướng dương",
      description: "Hoa hướng dương vàng rực, mang ý nghĩa tích cực",
      price: 200000,
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Hoa lavender",
      description: "Hoa lavender tím nhẹ, hương thơm dễ chịu",
      price: 220000,
      image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=500&q=80",
    },
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});