const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  title: { type: "String", required: true },
  author: "String",
  url: { type: "String", required: true },
  likes: "Number",
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: { type: "Array", default: [] }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const blog = mongoose.model("Blog", blogSchema)

module.exports = blog