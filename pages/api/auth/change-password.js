import dbConnect from '../../../db/dbConnect';
import User from '../../../models/User';
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()

    if (!dbConnect) {
      res.status(400).json({ success: false, error: "db: undefined" })
    }
    switch (method) {
      case 'PUT':
        try {
            const id = req.body.id
            const oldpassword = req.body.oldpassword
            const newpassword = req.body.newpassword
            
            const user = await User.findOne({ id: id });
            !user && res.status(401).json({ success: false, error: "Wrong credentials!" })

            
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
              );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            OriginalPassword !== req.body.password &&
                res.status(401).json({ success: false, error: "Wrong old Password!" })

            res.status(200).json({success: true});
            
            // OriginalPassword !== req.body.password &&
            //     res.status(401).json({ success: false, error: "Wrong credentials!" })

            //     const accessToken = jwt.sign(
            //         {
            //           id: user._id,
            //           isAdmin: user.isAdmin,
            //         },
            //         process.env.JWT_SEC,
            //         {expiresIn:"3d"}
            //       );
              
            //  const { password, ...others } = user._doc;
            //  res.status(200).json({success: true, ...others, accessToken});

        } catch (error) {
          res.status(500).json({ success: false, error: error })
        }
        break
      
    default:
        res.status(400).json({ success: false, error: "I only work with PUT" })
        break
    }
  }