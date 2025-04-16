const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true }, 
  password: { type: String, required: function() { return this.authType === "Email"; } },
  profilePicture: { type: String, default: null },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  status: { type: String,  enum: ["Inactive", "Active","Deleted"], default: "Inactive" },
  firebaseUid: { type: String, default: null },
  token: { type: String, default: null, required: false },
  authType: { type: String, enum: ["Email", "Google"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
