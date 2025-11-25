import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation

        if (!username || !email || !password) {
          return res.status(400).json({ message: "All fields are important !"})
        }

        // check if user exists already

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
           return res.status(400).json({ message: "user already exists !"})  
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        })

        res.status(201).json({
           message: "User registered",
           user: { id: user._id, email: user.email, username: user.username}  
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message})
    }  
};

const loginUser = async (req, res) => {
    try {
        
        // cheks if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        res.status(200).json({
            message: "User Logged in",
            user: {
               id: user._id,
               email: user.email,
               username: user.username 
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export { registerUser, loginUser }