const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Blog = require('../Models/blogsModel');

//Below function is to check whether the given string is a valid ObjectId or not
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);
};

const TokenValidation = (req, res, next) => {
    try {
        let jwttoken = req.headers["x-Api-key"]; //getting token from header
        if (!jwttoken) {//if token is not present
            jwttoken = req.headers["x-api-key"];//getting token from header
        }

        if (!jwttoken) {
            return res.status(401).send({ status: false, msg: "Token must be present" });
        }

        let decodedToken = jwt.verify(jwttoken, "Uranium-Group-24"); //verifying token with secret key

        if (decodedToken.length == 0) { return res.status(401).send({ status: false, msg: "Token is incorrect" }) }

        req['x-api-key'] = req.headers['x-api-key']
        req['authorId']=decodedToken.authorId;
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, data: err.message });
    }
}
const authorization = async (req, res, next) => {
    try {
        //author id extracted from token
        let loggedInUser=req.authorId;
        
        let authorLogging;

        if (req.body.hasOwnProperty('authorId')) { //if authorId is present in request body

            //checking whether the authorId is valid or not
            if (!isValidObjectId(req.body.authorId)) return res.status(400).send({ status: false, msg: "Enter a valid author Id" })
            authorLogging = req.body.authorId; //getting authorId from request body
        }

        else if (req.params.hasOwnProperty('blogId')) { //if blogId is present in request params

            //checking whether the blogId is valid or not
            if (!isValidObjectId(req.params.blogId)) {
                return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })
            }

            let blogData = await Blog.findById(req.params.blogId); //getting blog data from database using blogId

            if (!blogData) {
                return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });
            }
            authorLogging = blogData.authorId.toString(); //getting authorId from blog data using blogId and converting it to string
        }

        //if authorId is not present in request body or request params or request query
         if (!authorLogging) {
            return res.status(400).send({ status: false, msg: "AuthorId is required" });
        }
        //checking whether the loggedInUser is same as authorLogging or not
        if (loggedInUser != authorLogging) return res.status(403).send({ status: false, msg: "Error, authorization failed" });
        next(); //if authorId is same then next function will be called respectively
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports = { TokenValidation, authorization }; //exporting authentication and authorization functions