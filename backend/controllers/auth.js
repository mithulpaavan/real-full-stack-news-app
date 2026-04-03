const express = require('express');

const User = require('../models/userModel.js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const {username, email, password} = req.body;

    try{

    const existingUser = await User.findOne({email});

    if(existingUser){
       return res.status(400).json({message: "user aldready exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
     });

    await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
    }, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        samesite: "lax",
    })

    res.status(200).json({success: true, message: "succeefully registered"})
}
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "server error"});
    }
}

exports.signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email}).select("+password");

        const result = await bcrypt.compare(password, existingUser.password);

        if(!result){
            return res.status(401).json({success: false, message: "wrong details"})
        }

        const token = jwt.sign(
            {
            id: existingUser._id, 
            username: existingUser.username,
            email: existingUser.email
        }, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            samesite: "lax"
        });

        res.status(200).json({success: true, message: "succeefully registered"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "server error"});
    }
}

exports.signout = async (req, res) => {
    try{
   res.cookie('token', '', {
    httpOnly: true,
    secure: true, 
    sameSite: 'lax',
    expires: new Date(0),
    path: '/',   
  });
    res.status(200).json({ message: "Logged out successfully" });
    }
    catch(err){
        console.log(err);
    }
}