let hm = new mongoose.Schema({
user: String,
  reason: String,
  moderator: String,
  
});

module.exports = mongoose.model("ban", hm);
