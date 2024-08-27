const express = require('express'),
    router = express.Router()

const userService = require('../services/user.service')    

//localhost:5000/api/users/
router.get('/', async (req, res) => {
    const users = await userService.getAllUsers()
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    if(user == undefined)
        res.status(404).json('No record with the given id : ' + req.params.id)
    else
        res.send(user)
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await userService.deleteUser(req.params.id)
    if(affectedRows == 0)
        res.status(404).json('No record with the given id : ' + req.params.id)
    else
        res.send("deleted successfully.")
})

router.post('/', async (req, res) => {
    await userService.addOrEditUser(req.body)
    res.status(201).send('created successfully.')
})

router.put('/:id', async (req, res) => {
    const affectedRows = await userService.addOrEditUser(req.body, req.params.id)
    
    if(affectedRows == 0)
        res.status(404).json('No record with the given id : ' + req.params.id)
    else
        res.send("Updated successfully.")

    res.send(data)
})

module.exports = router;