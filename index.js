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
    const kitchenItemsCollection = client.db("kitchen").collection("items");
    const reviewCollection = client.db("kitchen").collection("reviews");

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

    app.get("/items/:id", async (req, res) => {
      const newid = req.params.id;
      const query = { _id: ObjectId(newid) };
      const place = await kitchenItemsCollection.findOne(query);
      console.log(place);
      res.send(place);
    });
    app.post("/addreview", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      console.log("insert done");
    });
    app.post("/addservices", async (req, res) => {
      const review = req.body;
      const result = await kitchenItemsCollection.insertOne(review);
      console.log("insert done");
    });

    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        newPlaceId: id,
      };

      const cursor = reviewCollection.find(query);
      const reviewsById = await cursor.toArray();
      // console.log(result);
      res.send(reviewsById);
    });
    app.get("/userReview/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const query = {
        email,
      };

      const cursor = reviewCollection.find(query);
      const reviewsByEmail = await cursor.toArray();

      res.send(reviewsByEmail);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`server is active on port ${port}`);
});
