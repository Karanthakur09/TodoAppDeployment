import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide All Fields'
            })
        }
        //check for existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'user alreay exists'
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);

        //now need to save new user in db
        const newUser=new userModel({username,email,password:hashedPass});
        await newUser.save();


        res.status(201).send({
            success:true,
            message:'User Registered Successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Register API',
            error
        })
    }
}

//LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find user
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    // match passowrd
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "login api",
      error,
    });
  }
}

