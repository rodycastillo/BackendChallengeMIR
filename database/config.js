const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_DB).then(() =>
      console.log("Favs DB connected successfully! 🤓")
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
