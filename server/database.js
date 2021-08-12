import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect("mongodb+srv://deyvis:merari2305@cluster-api.mcwff.mongodb.net/dbgallery?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to: ", db.connection.name);
  } catch (e) {
    console.log(e);
  }
})();
