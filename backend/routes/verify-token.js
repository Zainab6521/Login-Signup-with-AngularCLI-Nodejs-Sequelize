'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

router.get('/v1/api/get/verify/token', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("token ", token);
    jwt.verify(token, config.secret.secret, (error) => {
        if (error) {
            return res.status(401).send({ message: 'Fail to Authentication. Error -> ' + error });
        }
        res.status(200);
    });
});

module.exports = router;
