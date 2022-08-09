// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");
// const bcrypt = require("bcrypt");
// //importing the required libraries and the connection to the database

// class User extends Model {
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// const hashLength = 10;
// //setting the hash lenght, larger numbers means more secure, but a longer login time

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4],
//       },
//     },
//   },
//   {
//     hooks: {
//       //hasing the password on creation so the database/owner cannot see users unhashed saved passwords
//       async beforeCreate(newUserData) {
//         newUserData.password = await bcrypt.hash(
//           newUserData.password,
//           hashLength
//         );
//         return newUserData;
//       },
//       async beforeUpdate(updateUserData) {
//         updateUserData.password = await bcrypt.hash(
//           updateUserData.password,
//           hashLength
//         );
//         return updateUserData;
//       },
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "user",
//   }
// );

// module.exports = User;

const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  profilePicture: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
