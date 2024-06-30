const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const User = require('../models/User')
const USER_ROLES = require('../constants/userRoles')


const register = async (req, res, next) => {
  try {
    const {name, email, password, address, role} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return next(ApiError.badRequest('User already exists'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role: role || USER_ROLES.CUSTOMER,
    });

    await newUser.save();
    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    next(ApiError.internal('Internal Server Error'));
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if (!existingUser) {
      return next(ApiError.notFound('Invalid email or password'));
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return next(ApiError.notFound('Invalid email or password'));
    }

    const token = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '12h',
        }
    );

    res.json(token);
  } catch (error) {
    next(ApiError.internal('Internal Server Error'));
  }
};


const getById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(ApiError.badRequest('Invalid user ID'));
    }
    next(ApiError.internal('Internal Server Error'));
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(ApiError.badRequest('Invalid user ID'));
    }
    next(ApiError.internal('Internal Server Error'));
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const {name, address, role} = req.body;
    if (!Object.values(USER_ROLES).includes(role)) {
      return next(ApiError.badRequest('Invalid role specified'))
    }
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {name, address, role},
        {new: true}
    ).select('-password');

    if (!updatedUser) {
      next(ApiError.notFound('User not found'))
    }
    res.json(updatedUser)
  } catch (error) {
    next(ApiError.internal('Internal Server Error'));
  }
}

module.exports = {
  register,
  login,
  getById,
  getAll,
  update
}