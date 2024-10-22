import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 7000;
const app = express();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("<h1>Server is working</h1>");
});
