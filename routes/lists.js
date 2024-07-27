const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
    //for the above line to get specific type of contents you need to mention the type
    //and genre of the content this can be specified with a particular kind of request
    //like:  "localhost:8800/api/lists?type=series&genre=action"


  //below line is to get the type weather MOVIES or SERIES that you want to fetch  
  const typeQuery = req.query.type;
  //below line is to get the genere of the type weather COMEDY or THRILLER or something else. 
  const genreQuery = req.query.genre;
  let list = [];
  try {
    // if the query type is movie or series then the below condition will handel the req.
    if (typeQuery) {
        // if the genre type is action,comedy etc. then the below condition will handel the req.
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
          { $sample: { size: 10 } }
        ]);
        // if the genre type is not given then the below condition will handel the req.
      } else {
        list = await List.aggregate([
          { $match: { type: typeQuery } },
          { $sample: { size: 10 } }
        ]);
      }
        // if the type is not given then the below condition will handel the req.
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a list by ID
router.get("/:id", verify, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json("List not found");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD MOVIE TO LIST
router.put("/:id/add", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      // Find the list by ID and update the content array
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $push: { content: req.body.movieId } },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

// REMOVE MOVIE FROM LIST
router.put("/:id/remove", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      // Find the list by ID and update the content array
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $pull: { content: req.body.movieId } },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});


module.exports = router;