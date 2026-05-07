import app from "./app.js";
import { scrapreHackerNews } from "./src/controllers/scrape.controller.js";
import { dbConnect } from "./src/database/db.connect.js"

const PORT = process.env.PORT || 3000;
dbConnect()
  .then(async() => {
    app.listen(PORT, () => {
      console.log("App is lesting on PORT", PORT);
    });
    await scrapreHackerNews()
  })
  .catch((err) => {
    console.log("Something wrong while connecting with the DB,", err);
  });
