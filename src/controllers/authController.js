const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const authController = {
  // Register User
  async register(req, res) {
    try {
      console.log("Registering User:", req.body);
      const { name, email, password } = req.body;

      // 0. Validation
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
      }

      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }

      // 1. Check if user exists
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      // 2. Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 3. Create user
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        const token = generateToken(user._id);
        
        // Set cookie
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
          }
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Login User
  async login(req, res) {
    try {
      console.log("Login attempt:", req.body.email);
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
      }

      // 1. Check if user exists
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // 2. Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // 3. Generate Token
      const token = generateToken(user._id);

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Logout
  async logout(req, res) {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
};

module.exports = authController;
