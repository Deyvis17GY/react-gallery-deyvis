import mongoose from "mongoose"
;(async () => {
  try {
    const db = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/db_spaces",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log("Connected to: ", db.connection.name)
  } catch (e) {
    console.log(e)
  }
})()
