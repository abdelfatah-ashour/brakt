const Author = require("../model/author-model");
const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { serialize } = require("cookie");
const { validateRegister } = require("../utilities/validateRegister");

async function register(req, res) {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const { error } = validateRegister(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const isUser = await Author.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        message: "email is already exits",
      });
    }

    // there is validation
    const hashedPassword = await hash(password, 10);

    const newAuthor = new Author({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newAuthor.save((error) => {
      if (error) throw new Error(error);
    });

    return res.status(201).json({
      message: "register successful",
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // there validation
    const isAuthor = await Author.findOne({ email });
    if (!isAuthor) {
      return res.status(400).json({ message: "email or password incorrect" });
    }
    const comparedPassword = await compare(password, isAuthor.password);

    if (!comparedPassword) {
      return res.status(400).json({ message: "email or password incorrect" });
    }

    // generate token
    const user_token = generateToken({ _id: isAuthor._id });

    res.cookie(
      serialize(
        "user_info",
        JSON.stringify({
          _id: isAuthor._id,
          username: isAuthor.username,
          email: isAuthor.firstName,
        }),
        {
          httpOnly: false,
          secure: false,
          sameSite: false,
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        }
      )
    );

    res.cookie(
      serialize("user_token", user_token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : false,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })
    );
    return res.status(200).json({ message: "login successful" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("user_info");
    res.clearCookie("user_token");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

async function forgetPassword(req, res) {
  try {
    await Author.findOne(
      { email: req.body.email },
      null,
      { new: true },
      (error, result) => {
        if (error) throw new Error(error);
        if (!result)
          return res.status(400).json({ message: "email not found" });

        if (result) {
          const token = tokenResetPassword({ _id: result._id });
          res.cookie(
            serialize("reset_p", token, {
              maxAge: 60 * 15, // 10 min
            })
          );
          return res
            .status(200)
            .json({ message: "email found , enter new password " });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

async function newPassword(req, res) {
  try {
    if (req.cookies.reset_p) {
      const newHashedPassword = await hash(req.body.newPassword, 10);
      await Author.findOneAndUpdate(
        { email: req.cookies.reset_p._id },
        { password: newHashedPassword },
        { new: true },
        (error) => {
          if (error) throw new Error(error);
          res.clearCookie("reset_p");
          return res.status(200).json({
            message: "password changed",
          });
        }
      );
    } else {
      return res.status(401).json({
        message: "token is expired",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

async function isAuth(req, res, next) {
  try {
    const { user_token } = req.cookies;
    if (!user_token) {
      return res.status(403).json({ message: "access denied" });
    }
    const verified = await verify(user_token, process.env.ACCESS_TOKEN);
    if (!verified) {
      return res.status(401).json({ message: "you are not authorized" });
    }
    req.user = verified;
    next();
  } catch (error) {
    return res.status(500).json({ message: "something went wrong!" });
  }
}

function generateToken(data) {
  return sign(data, process.env.ACCESS_TOKEN);
}

function tokenResetPassword(data) {
  return sign(data, process.env.ACCESS_TOKEN);
}

module.exports = {
  register,
  login,
  logout,
  isAuth,
  forgetPassword,
  newPassword,
};
