const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Mentor = require("../models/mentor.model");


// @route   POST api/auth/login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password ith 6 or more charecters"
    ).exists()
  ],
  async (req, res) =>
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let mentor = await Mentor.findOne({ email });
      if (!mentor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Compare the Password
      isMatch = await bcrypt.compare(password, mentor.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return the jsonwebtoken
      const payload = {
        mentor: {
          name: mentor.name,
          _id: mentor._id,
          email: mentor.email
        }
      };
      jwt.sign(
        payload,
        process.env.SECRETTOKEN,
        { expiresIn: 360000 },
        (err, token) =>
        {
          if (err) throw err;
          res.json({
            resultShort: "success",
            resultLong: "Mentor logged in successfully....",
            token,
            mentor
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("OOPS, Something went Wrong");
    }
  }
);

// @route   POST api/auth/register
router.post("/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password ith 6 or more charecters"
    ).isLength({ min: 6 })
  ],
  async (req, res) =>
  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    console.log('req body', req.body);


    try {
      //  Check if the mentor already exist
      let mentor = await Mentor.findOne({ email });
      if (mentor) {
        return res
          .status(400)
          .json({ errors: [{ msg: `The email ${email} is already exists` }] });
      }

      mentor = new Mentor({
        name,
        email,
        password
      });

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      mentor.password = await bcrypt.hash(password, salt);
      await mentor.save();
      return res.status(200).json({
        resultShort: 'succsess',
        resultLong: 'The mentor has been created successfully...',
        mentor
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("OOPS, Something went Wrong");
    }
  }
);


// @route   GET api/auth
router.get("/", auth, async (req, res) =>
{
  const { _id } = req.user;
  try {
    const mentor = await Mentor.findById(_id).select("-password");
    res.json({
      resultShort: "success",
      resultLong: "The Mentor Data Fetched Successfully",
      mentor
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      resultShort: "failure",
      resultLong: "Something went wrong"
    });
  }
});


module.exports = router;
