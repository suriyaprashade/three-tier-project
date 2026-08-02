const express = require("express");
const cors = require("cors");
const getConnection = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

(async () => {

  const db = await getConnection();

  app.get("/users", (req, res) => {

    db.query(
      "SELECT * FROM users",
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json(result);
      }
    );
  });

})();

app.listen(5000, () => {
  console.log("Backend Running");
});
