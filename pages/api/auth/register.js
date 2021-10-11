import dbConnect from '../../../db/dbConnect';
import User from '../../../models/User';
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()
    
    switch (method) {
      case 'POST':
        const newUser = new User({
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString(),
          });
          try {
            const user = await newUser.save();
            const accessToken = jwt.sign(
              {
                id: user._id
              },
              process.env.JWT_SEC,
              {expiresIn:"3d"}
            );

            const { password, ...data } = user._doc;
            res.status(201).json( {data, accessToken} );
          } catch (err) {
            res.status(500).json(err);
          }  
        break
      default:
        res.status(400).json({ success: false, error: "I only work with POST" })
        break
    }
  }