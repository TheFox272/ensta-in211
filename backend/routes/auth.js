import express from 'express';
import { appDataSource } from '../datasource.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/user.js';

const authRouter = express.Router();

// Define a JWT secret key. This should be isolated by using env variables for security

const jwtSecretKey = "dsfdsfsdfdsvcsvdfgefg"
/*
const app = express()

// Set up CORS and JSON middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/

// The auth endpoint that creates a new user record or logs a user based on an existing record
/*
authRouter.post("/", function(req, res) {
    appDataSource
    console.log("req.body", req.body)
    appDataSource.getRepository(User)
    const { email } = req.body["email"];
    console.log("email : ", req.body)
    //const movies = await movieRepository.find();
    .find({ where: { email: email } })
    appDataSource.then(function(users) {
    if (users.length > 0) {
        // If user with the provided email is found, return it
        res.json({ user: users[0] });
        //bcrypt.compare(password, users[0].password, function (_err, result) {
        bcrypt.compare(password, users[0].hash, function (_err, result) {
          if (!result) {
                return res.status(401).json({ message: "Invalid password" });
            } else {
                let loginData = {
                    email,
                    signInTime: Date.now(),
                };
    
                const token = jwt.sign(loginData, jwtSecretKey);
                res.status(200).json({ message: "success", token });
            }
        });
      } else {
        // If no user found with the provided email, return nothing
        res.json({ user: null });
        bcrypt.hash(password, 10, function (_err, hash) {
        console.log({ email, password: hash })
        //db.get("users").push({ email, password: hash }).write()
        const userRepository = appDataSource.getRepository(User);
        const newUser = userRepository.create({
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          avatar: req.body.avatar,
        });
        
        userRepository
          .insert(newUser)
          .then(function (newDocument) {
            res.status(201).json(newDocument);
          })
          .catch(function (error) {
            console.error(error);
            if (error.code === '23505') {
              res.status(400).json({
                message: `User with email "${newUser.email}" already exists`,
              });
            } else {
              res.status(500).json({ message: 'Error while creating the user' });
            }
          });
        });

      }
          let loginData = {
              email,
              signInTime: Date.now(),
          };

          const token = jwt.sign(loginData, jwtSecretKey);
          res.status(200).json({ message: "success", token });
      });
      
     })
    .find({})
    .then(function (users) {
        res.json({ users: users });

        console.log(req.body)
        const user = users.map(user => user.email);
        console.log(user)
        //const emails = users.map(user => user.email);
        //res.json({ emails: emails });
        //console.log(emails); 
      //if (user.length === 1) {
    // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
    //} 
   // });
    
   
  })
  
  */
  authRouter.post("/", async function(req, res) {
    try {
        const { email, password} = req.body; // Extract email and password from request body

        const userRepository = appDataSource.getRepository(User);

        // Check if user with provided email exists
        const existingUser = await userRepository.findOne({ where: { email } });

        if (existingUser) {
            // User with provided email found
            console.log("existing user", existingUser.id)
            bcrypt.compare(password, existingUser.hash, function(err, result) {
                if (!result) {
                    return res.status(401).json({ message: "Invalid password" });
                } else {
                    const loginData = {
                        email,
                        signInTime: Date.now(),
                    };
                    const token = jwt.sign(loginData, jwtSecretKey);
                    return res.status(200).json({ message: "success", token, userId: existingUser.id});
                }
            });
        } else {
            // No user found with provided email, create new user
            bcrypt.hash(password, 10, async function(err, hash) {
                const newUser = userRepository.create({
                    email,
                    firstname: "test",//req.body.firstname,
                    lastname: "osef",//req.body.lastname,
                    avatar: req.body.avatar,
                    hash: hash // Ensure to store the hashed password
                });

                try {
                    const savedUser = await userRepository.save(newUser);
                    return res.status(201).json(savedUser);
                } catch (error) {
                    console.error(error);
                    if (error.code === '23505') {
                        return res.status(400).json({ message: `User with email "${email}" already exists` });
                    } else {
                        return res.status(500).json({ message: 'Error while creating the user' });
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// The verify endpoint that checks if a given JWT token is valid
authRouter.post('/verify', (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];
    try {
      const verified = jwt.verify(authToken, jwtSecretKey);
      if (verified) {
        return res
          .status(200)
          .json({ status: "logged in", message: "success" });
      } else {
        // Access Denied
        return res.status(401).json({ status: "invalid auth", message: "error" });
      }
    } catch (error) {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }

})

// An endpoint to see if there's an existing account for a given email address
/*
authRouter.post('/check-account', (req, res) => {
    appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
      const { email } = req.body
      console.log(req.body)
      const user = users.map(user => user.email);
      console.log(user)
    //const user = db.get("users").value().filter(user => email === user.email)

    
    res.status(200).json({
        status: user.length === 1 ? "User exists" : "User does not exist", userExists: user.length === 1
        
    })
    })
})
*/
authRouter.post('/check-account', (req, res) => {
  const { email } = req.body;
  appDataSource
      .getRepository(User)
      .find({})
      .then(function (users) {
          const userExists = users.some(user => user.email === email);
          //const userId = users.find(user => user.email === email)?.id;
          const status = userExists ? "User exists" : "User does not exist";
          res.status(200).json({ status: status, userExists: userExists});
      })
      .catch(error => {
          console.error('Error checking account:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
});

export default authRouter;


