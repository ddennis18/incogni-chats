import User from '../models/User.js'
import bcrypt from 'bcrypt'

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
      message: 'failed to register user due to internal errors'
    })
  }
}

export async function loginUser (req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send({ ok: false, message: 'invalid credentials' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ ok: false, message: "user doesn't exist" })
    }
  } catch (error) {}
}
