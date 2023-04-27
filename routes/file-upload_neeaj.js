const express= require('express');
const router = express.Router();
const image_upload = require('../models/users_schema');

const path = require('path');
const fs = require('fs');


router.post('/upload', async(req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'    
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
          
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
  avatar.mv('./uploads/' + avatar.name);

            //send response
            // res.send({
            //   avatar: req.protocol+"://"+req.get("host")+"/"+avatar.name,
            //     status: true,
            //     message: 'File is uploaded',
            // });
            
            //save to database
            const image = new image_upload({
               full_name: req.body.full_name,
               title: req.body.title,
               about: req.body.about,
               phone: req.body.phone,
               username: req.body.username,
               email: req.body.email,
               language: req.body.language,
               country: req.body.country,
               password: req.body.password,
               rpt: req.body.rpt,
               otp: req.body.otp,
                dp: req.protocol+"://"+req.get("host")+"/"+avatar.name,
            });
            await image.save();
            res.send({
                status: true,
                message: 'File is uploaded',
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports= router;