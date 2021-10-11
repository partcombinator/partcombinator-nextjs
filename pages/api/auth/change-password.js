import dbConnect from '../../../db/dbConnect';
import User from '../../../models/User';
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()

    if (!dbConnect) {
      res.status(400).json({ success: false, error: "db: undefined" })
    }
    verifyToken(req, res)
    switch (method) {
      case 'PUT':
        try {
            const id = req.body.id
            const oldpassword = req.body.oldpassword
            const newpassword = req.body.newpassword

            oldpassword === newpassword  &&  
                res.status(401).json({ success: false, error: "Passwords have to be different"})
            
            const user = await User.findOne({ _id: id });

            !user && 
                res.status(401).json({ success: false, error: "Wrong credentials!" })

            
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
              );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            OriginalPassword !== oldpassword &&
                res.status(401).json({ success: false, error: "Wrong old Password!" })
            
            const hashedPasswordNew  = CryptoJS.AES.encrypt(
                    newpassword,
                    process.env.PASS_SEC
                  ).toString()
                  
            const userUpdate = await User.findByIdAndUpdate(id, { password: hashedPasswordNew }, {
                    new: true,
                    runValidators: true,
                  })
            
            if (!userUpdate) {
                    return res.status(400).json({ success: false, error: "Error at update the password"  })
            }
            
            res.status(200).json({success: true});
            
        } catch (error) {
          res.status(500).json({ success: false, error: error })
        }
        break
      
    default:
        res.status(400).json({ success: false, error: "I only work with PUT" })
        break
    }
  }