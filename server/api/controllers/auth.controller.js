import User from "../models/user.model.js";
import Joi from 'joi';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*-_=+]{3,30}$')).required(),
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
    termsAccepted: Joi.alternatives(Joi.boolean(), Joi.string().valid('ok')).optional(),
});

export const signup = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid input!', error: error.details[0].message });
    }

    const { username, email, password, phoneNumber, termsAccepted } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const uid = uuidv4(); // Generate a new UUID

    const newUser = new User({
        uid, // Include the UID in the new user object
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        termsAccepted
    });

    try {
        await newUser.save();
        res.status(200).json({ message: 'User created successfully!' });
    } catch (error) {
        next(error);
    }
}



export const login = async (req, res, next) => {
    const { identifier, password } = req.body; // rename email to identifier
    try {
        // Search for a user with the provided email or phone number
        const ValidUser = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }]
        });
        if (!ValidUser) {
            return next(errorHandler(404, 'user not found'));
        }
        const isMatch = bcrypt.compare(password, ValidUser.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Wrong Credentials'));
        }
        const token = jwt.sign({ _id: ValidUser._id }, process.env.JWT_SECRET);
        const { password: pwd, phoneNumber: phone, termsAccepted: tandc, ...others } = ValidUser._doc;
        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({ others });
    } catch (error) {
        next(error);
    }
};



export const logout = (req, res) => {
    // Clear the access_token cookie
    res.cookie('access_token', token, { httpOnly: true, sameSite: 'none', secure: true }).status(200).json({ message: 'Logged out successfully' });
};


export const google = async (req, res, next) => {
    try {
        const { email, name, photo, phoneNumber } = req.body;

        // Check if the user exists
        let user = await User.findOne({ email });

        if (user) {
            // If user already exists, generate token and respond with user details
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true, sameSite: 'none', secure: true }).status(200).json(rest);
        } else {
            // If user doesn't exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            // Generate a unique username based on the name
            const username = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);

            const uid = uuidv4(); // Generate a new UUID

            // Create the new user with avatar field
            let newUser = {
                uid, // Include the UID in the new user object
                username,
                email,
                password: hashedPassword,
                photo: photo,
            };

            // Only add the phoneNumber field if it's not undefined or null.
            if (phoneNumber !== undefined && phoneNumber !== null) {
                newUser.phoneNumber = phoneNumber;
            }

            newUser = new User(newUser);
            await newUser.save();

            // Respond with the newly created user details and token
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true, sameSite: 'none', secure: true }).status(200).json(rest);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in Google OAuth:', error);
        next(error);
    }
};
