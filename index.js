const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_password}@cluster0.yfdgs6q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
app.get("/", (req, res) => {
  res.send("Server is active");
});
async function run() {
  try {
    const kitchenItemsCollection = client
      .db("travelDb")
      .collection("touristPlace");
    const reviewCollection = client.db("travelDb").collection("reviews");

    app.get("/items", async (req, res) => {
      const limit = parseInt(req.query.limit) || 0;
      const query = {};
      const cursor = kitchenItemsCollection.find(query);
      const result = await cursor.limit(limit).toArray();
      res.send(result);
    });

    app.post("/items", async (req, res) => {
      const limit = parseInt(req.query.limit) || 0;
      const query = {};
      const cursor = kitchenItemsCollection.find(query);
      const result = await cursor.limit(limit).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`server is active on port ${port}`);
});
