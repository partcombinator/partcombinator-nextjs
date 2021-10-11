import mongoose from 'mongoose'

const connection = {} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }
  try {
    /* connecting to our database */
    const url = process.env.MONGODB_URI
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log(error)
  }
  
}

export default dbConnect