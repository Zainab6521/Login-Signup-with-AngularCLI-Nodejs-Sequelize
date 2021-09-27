const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const crypto = require('crypto');

const models = require('../models');
const config = require('../config/config');

const router = express.Router();

router.post('/v1/api/register-user', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = validateUser(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            const user = await models.user.findOne({ where: { email } });
            if (!user) {
                const hash = crypto.createHash('sha256').update(password).digest('hex');
                await models.user.create({ ...req.body, password: hash });
                res.status(200).json({ message: 'User created successfully.' });
            } else {
                res.status(200).json({ message: `${email} account already exists, please try another email.` });
            }
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.post('/v1/api/login-user', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            const { email, password } = req.body;
            const hash = crypto.createHash('sha256').update(password).digest('hex');
            const user = await models.user.findOne({ where: { email, password: hash } });
            if (user) {
                const token = jwt.sign({ email }, config.secret.secret, { expiresIn: '7d' });
                res.status(200).send({ message: "You have been logged in successfully!", accessToken: token, user })
            } else {
                res.status(400).send({ message: "Login details are not correct." });
            }
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get('/v1/api/get-user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await models.user.findOne({ where: { id } });
        if (user) {
            res.status(200).json({ message: 'User Found'})
        } else {
            res.status(404).json({ message: 'Not found!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});


router.delete('/v1/api/delete-user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await models.user.findOne({ where: { id } });
        if (user) {
            await models.user.destroy({ where: { id } })
            res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Not found!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

function validateUser(object) {
    const schema = {
        name: Joi.string(),
        password: Joi.string().min(5).max(50).required(),
        email: Joi.string().required()
    };

    return Joi.validate(object, schema);
}

module.exports = router;
