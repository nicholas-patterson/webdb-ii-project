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

router.get("/:id", validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post("/", validateCarPost, (req, res) => {
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

router.put("/:id", validateCarId, validateCarPost, (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  db("cars")
    .where({ id: req.params.id })
    .update(updatedInfo)
    .then(count => {
      if (!count) {
        res
          .status(400)
          .json({ error: `Could not find car with the ID: ${id}` });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `Server could not update car with ID: ${id}` });
    });
});

router.delete("/:id", validateCarId, (req, res) => {
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

function validateCarId(req, res, next) {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .first()
    .then(car => {
      console.log("WHAT COME BACK ?", car);
      if (!car) {
        res.status(400).json({ error: "Car with that ID does not exist" });
      } else {
        req.car = car;
        next();
      }
    });
}

function validateCarPost(req, res, next) {
  const post = req.body;
  const mileage = req.body.mileage;
  const vin = req.body.vin;
  if (vin.length > 17) {
    res.status(400).json({ error: "Vin number is too long" });
  } else if (typeof vin !== "string") {
    res.status(400).json({ error: "Vin number must be a string" });
  } else if (typeof mileage !== "number") {
    res.status(400).json({ error: "Mileage must be a number" });
  }
}

module.exports = router;
