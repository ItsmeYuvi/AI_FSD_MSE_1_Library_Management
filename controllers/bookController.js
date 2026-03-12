const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const books = await Book.find({
      title: { $regex: req.query.title, $options: "i" }
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};