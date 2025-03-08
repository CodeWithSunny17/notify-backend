const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://maisunnyhu:Sunny1997@cluster0.zpe60.mongodb.net/Notes")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = {
  Note,
};
