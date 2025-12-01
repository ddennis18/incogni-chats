import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// /api/user/auth

export async function registerUser (req, res) {
  try {
    const { username, email, password } = req.body || {}
    //check if the validity of the credentials
    if (!username || !password || !email) {
      return res
        .status(400)
        .send({ ok: false, message: 'invalid user credentials' })
    }
    //check if the user with the email already exists
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).send({ ok: false, message: 'user already exists' })
    }

    //hash the password;
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT)
    )

    //initailise new user with the the credentials
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    //save the user to mongo db
    await newUser.save()
    res.status(201).send({ ok: true, message: 'user registered successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}

export async function loginUser (req, res) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).send({ ok: false, message: 'invalid credentials' })
    }

    //find the user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ ok: false, message: 'invalid credentials' })
    }

    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ ok: false, message: 'inavlid credentials' })
    }

    const accessToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    //send the refresh token saved as refresh token
    res.cookie('refreshToken', refreshToken, {
      //so it cant be accessed by client side js
      httpOnly: true,
      //can only be send over via https only in production
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    return res.status(200).send({
      ok: true,
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}

export async function refreshToken (res, req) {
  //this function sends a new token when the access token expires
  try {
    const token = req.cookies.refreshToken
    if (!token) {
      return res.status(401).send({ ok: false, messsage: 'unauthorised' })
    }

    //verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).send({ ok: false, messsage: 'user not found' })
    }

    const accessToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )

    return res.status(200).send({
      ok: true,
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.log('error refreshing token:', error)
    return res.status(500).send({ ok: false, messsage: 'server error' })
  }
}

export async function logoutUser (req, res) {
  try {
    //delete the refreshToken on the backend
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    res.status(200).send({ ok: true, messsage: 'logged out successfully' })
  } catch (error) {
    console.log('logging out user:', error)
    return res.status(500).send({ ok: false, messsage: 'server error' })
  }
}
