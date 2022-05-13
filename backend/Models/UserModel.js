const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },
    pic: {
      type: String,
      default:
        "https://www.google.com/search?q=user+picture&source=lnms&tbm=isch&sa=X&ved=2ahUKEwixxp7XlcHzAhW9uksFHUxyD7QQ_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=4C9OujEfKWS37M",
    },
  },
  {
    timestamps: true,
  }
);

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
 
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("dsuser", userSchema);

module.exports = User;
