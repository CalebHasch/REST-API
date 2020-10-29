'use strict';

const express = require('express');
//const { json } = require('sequelize/types');
//const { authenticateUser } = require('./auth-user');
const { User } = require('./models');
const { Course } = require('./models');

// const Course = require('./models/course');
// const User = require('./models/user');

const router = express.Router();

function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}

// Route that returns the current authenticated user.
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json({
    name: user.firstName
  });
}));

// Route that creates user
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created." });
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// Route that returns list of courses
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll();
  const users = await User.findAll();
  
  res.json(courses);
  // for(let i = 0; i < courses.length; i++) {
  //   res.json({
  //     course: courses[i],
  //     // title: courses[i].title,
  //     // description: courses[i].description,
  //     // estimatedTime: courses[i].estimatedTime,
  //     // materialsNeeded: courses[i].materialsNeeded
  //     //user: courses[i].associate
  //   })
  //}
}));

// Route returns specific course
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id)
  const users = await User.findAll();
  
  res.json(course);
  // for(let i = 0; i < courses.length; i++) {
  //   res.json({
  //     course: courses[i],
  //     // title: courses[i].title,
  //     // description: courses[i].description,
  //     // estimatedTime: courses[i].estimatedTime,
  //     // materialsNeeded: courses[i].materialsNeeded
  //     //user: courses[i].associate
  //   })
  //}
}));

// Route creates a course
router.post('/courses', asyncHandler(async (req, res) => {
  try {
    await Course.create(req.body);
    res.status(201).json({ "message": "Course successfully created." });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;