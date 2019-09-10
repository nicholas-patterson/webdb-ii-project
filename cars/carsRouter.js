const express = require("express");
const db = require("../data/db-config");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: "Server could not get list of cars" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id: id })
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `Server could not retrieve car with the id: ${id}` });
    });
});

router.post("/", (req, res) => {
  const body = req.body;
  db("cars")
    .insert(body, "id")
    .then(([id]) => {
      console.log(id);
      db("cars")
        .where({ id })
        .first()
        .then(car => {
          res.status(201).json(car);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: `Car with id ${id} could not be found` });
        });
    })
    .catch(err => {
      res.status(500).json({ error: "Server could not post car" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .del()
    .then(count => {
      if (!count) {
        res
          .status(400)
          .json({ error: `Can not find car to delete with id: ${id}` });
      } else {
        res
          .status(202)
          .json({ message: `Car with the id: ${id} has been deleted` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Sever could not delete car" });
    });
});

module.exports = router;
