const now = require('./utils.js');
const Pet = require('./entities.js');


const logger = (req, res, next)  => {
    const datetime = now();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    
    console.log(`${datetime} | ${method} | ${url} | IP: ${ip}`);
    
    next();
};


const { body } = require('express-validator');
const validationRules = [
  body('name')
    .trim()
    .escape()
    .matches(/^\p{L}[\p{L}_-]*$/u)
    .withMessage('Имя должно начинаться с буквы и содержать только буквы и символы _ и -')
    .isLength({ min: 1, max: 100 })
    .withMessage('Длина имени должна быть от 1 до 100 символов')
];


const checkPetAlive = (req, res, next) => {
    const pet = res.locals.pet || null;
    if (!pet) {
        return res.status(404).json({ error: 'Питомец не найден' });
    }
    
    if (pet.state === Pet.STATE.DEAD) {
        return res.status(409).json({ error: 'Питомец умер' });
    }

    next();
};


module.exports = {
    logger,
    validationRules,
    checkPetAlive
};

