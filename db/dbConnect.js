import mongoose from 'mongoose'

const connection = {} /* creating connection object*/

async function dbConnect(url) {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }
  try {
    /* connecting to our database */
    console.log("process.env.MONGODB_URI:", url)
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