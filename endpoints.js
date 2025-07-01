const express = require('express');
const router = express.Router();


const { validationRules, checkPetAlive } = require('./middleware.js');


const Pet = require('./entities.js');
let pet = null;
router.use((req, res, next) => {
    res.locals.pet = pet;
    next();
});


// Получить информацию о питомце
router.get('/', checkPetAlive, (req, res) => {
    res.status(200).json(pet);
});


// Создать питомца
const { validationResult } = require('express-validator');
router.post('/', validationRules, (req, res) => {
    if (pet) {
        let message = 'Питомец уже существует';
        if (pet.state === Pet.STATE.DEAD) {
            message = 'Питомец умер';
        }
        return res.status(409).json({ error: message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Неверные данные',
            errors: errors.array()
        })
    }
    
    const { name } = req.body;
    pet = new Pet(name);

    res.status(201).json(pet);
});


// Кормить питомца
router.post('/feed', checkPetAlive, (req, res) => {
    pet.hunger = Math.max(0, pet.hunger - 30);
    pet.mood = Math.min(100, pet.mood + 10);
    pet.updatePetState();
    
    res.status(200).json(pet);
});


// Лечить питомца
router.post('/heal', checkPetAlive, (req, res) => {
    pet.health = Math.min(100, pet.health + 20);
    pet.hunger = Math.max(0, pet.hunger - 10);
    pet.updatePetState();
    
    res.status(200).json(pet);
});


// Играть с питомцем
router.post('/play', checkPetAlive, (req, res) => {
    pet.mood = Math.min(100, pet.mood + 15);
    pet.hunger = Math.min(100, pet.hunger + 5);
    pet.updatePetState();
    
    res.status(200).json(pet);
});


module.exports = router;