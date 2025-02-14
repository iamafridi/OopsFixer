// require("dotenv").config();
require("dotenv").config();
// console.log("🔑 API Key from .env:", `"${process.env.GOOGLE_GEMINI_KEY}"`);

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
