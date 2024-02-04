require("dotenv").config()

const PORT = process.env.PORT || 3003
let MONGODB_URI
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else if (process.env.NODE_ENV === "development") {
  MONGODB_URI = process.env.DEV_MONGODB_URI
} else {
  MONGODB_URI = process.env.PROD_MONGODB_URI
}
  

module.exports = { PORT, MONGODB_URI }