import app from "./app.js";
import { dbConnect } from "./database/db.connect.js";

const PORT = process.env.PORT || 3000;
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("App is lesting on PORT", PORT);
    });
  })
  .catch((err) => {
    console.log("Something wrong while connecting with the DB,", err);
  });
