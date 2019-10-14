const express = require('express');
const bycryptjs = require('bcryptjs');
const authentification = require('./authentification');
const { check, validationResult } = require('express-validator');

// SEQUELIZE
const db = require('./db');
const {
	Course,
	User
} = db.models;

// Router instatiation
const router = express.Router();


//****** COURSES ROUTES *********/

// Find all courses and their owners
router.get('/courses', async (req, res, next) => {

	try {

		const courses = await Course.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [{
				model: User,
				attributes: ['id', 'firstName', 'lastName', 'emailAddress']
			}]
		})

		res.status(200).json({
			courses
		}); 
		
	} catch (error) {
		res.status(500).end();
		next(error);
	}
});

// Find a specific course and his owner
router.get('/courses/:id', async (req, res, next) => {

	try {

		const course = await Course.findOne({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			where: {
				id: req.params.id
			},
			include: [{
				model: User,
				attributes: ['id', 'firstName', 'lastName', 'emailAddress']
			}]
		})

		if (course) {
			res.status(200).json({
				course
			});
		} else {
			res.status(404).end();
		}

	} catch (error) {
		res.status(500).end();
		next(error);
	}
});

// Add new course 
// VALIDATION
router.post('/courses', [
	check('title')
	  .exists()
	  .withMessage('Please provide a value for "title"'),
	check('description')
	  .exists()
	  .withMessage('Please provide a value for "description"'),
	check('userId')
	  .exists()
	  .withMessage('Please provide a value for "userId"')
  ], authentification, async (req, res, next) => {

	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	res.status(400).json({ errors: errors.array() });
  	} else {

		  if (req.body.title) {
			  try {
				  const course = await Course.findOne({
					  where: {
						  title: req.body.title
					  }
				  });
	  
				  if (course) {
					  res.status(400).json({
						  "message": "this course already exists"
					  })
				  } else {
					  try {
	  
						  const course = req.body;
						  course.userId = req.currentUser.id;
						  const _course = await Course.create(course);
						  res.status(201).location(`/courses/${_course.id}`).end();
	  
					  } catch (error) {
						  if (error.name === 'SequelizeValidationError') {
							  const errors = error.errors.map(error => error.message);
							  console.error('Validation errors: ', errors);
							  res.status(400).json({
								  errors
							  });
						  } else {
							  res.status(500).end();
							  next(error);
						  }
					  }	 
				  }
	  
			  } catch (error) {
				  res.status(500).end();
				  next(error);
			  }
		  } else {
			  res.status(400).end();
		  }
	  }
});

// Update course
// VALIDATION
router.put('/courses/:id', [
	check('title')
	  .exists()
	  .withMessage('Please provide a value for "title"'),
	check('description')
	  .exists()
	  .withMessage('Please provide a value for "description"')
  ], authentification, async (req, res, next) => {

	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	res.status(400).json({ errors: errors.array() });
  	} else {

		  try {
	  
			  const course = await Course.findByPk(req.params.id);
	  
			  if (course && course.userId === req.currentUser.id) {
	  
				try {
					await course.update(req.body);
					res.status(204).end();
				} catch (error) {
					res.status(404).end();
				}
				
			  } else {
				  res.status(400).end();
			  }

		  } catch (error) {
			  res.status(500).end();
			  next(error);
		  }
	  }
});

// Delete course
router.delete('/courses/:id', authentification, async (req, res, next) => {

	try {

		const course = await Course.findByPk(req.params.id);

		if (course && course.userId === req.currentUser.id) {

			try {
				await course.destroy();
				res.status(204).end();
			} catch (error) {
				res.status(500).end();
				next(error);
			}
		} else {
			res.status(403).end();
		}
	} catch (error) {
		res.status(500).end();
		next(error);
	}

});


//****** USERS ROUTES *********/

// Get the currently logged user
router.get('/users', authentification, async (req, res, next) => {

	const currentUser = req.currentUser;

	if (currentUser) {

		try {

			const user = await User.findOne({
				attributes: {exclude: ["createdAt", "updatedAt", "password"]},
				where: {
				  emailAddress: currentUser.emailAddress
				}
			  });

			res.json({
				user
			});

		} catch (error) {
			res.status(401).end();
		}
	}
	
});

// Add a new user
// VALIDATION
router.post('/users', [
	check('firstName')
	  .exists()
	  .withMessage('Please provide a value for "firstName"'),
	check('lastName')
	  .exists()
	  .withMessage('Please provide a value for "lastName"'),
	check('emailAddress')
	  .exists()
	  .withMessage('Please provide a value for "emailAddress"'),
	check('password')
	  .exists()
	  .withMessage('Please provide a value for "password"')
  ], async (req, res, next) => {

	const errors = validationResult(req);
	
  	if (!errors.isEmpty()) {
    	res.status(400).json({ errors: errors.array() });
  	} else {

		  try {
	  
			  let user = req.body;
			  user.password = bycryptjs.hashSync(req.body.password);
			  await User.create(user);
			  res.status(201).location('/').end();
	  
		  } catch (error) {
			  if (error.name === 'SequelizeValidationError') {
				  const errors = error.errors.map(error => error.message);
				  console.error('Validation errors: ', errors);
				  res.status(400).json({ errors });
			  } else if (error.name === 'SequelizeUniqueConstraintError') {
				  const errors = error.errors.map(error => error.message);
				  console.error('Validation errors: ', errors);
				  res.status(400).json({
					  "message": "This user already exists"
				  });
			  } else {
				  res.status(400).end();
				  next(error);
			  }
		  }
	  }

});


module.exports = router;