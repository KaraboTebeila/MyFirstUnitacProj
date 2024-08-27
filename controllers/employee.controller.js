const express = require('express'),
    router = express.Router()

const service = require('../services/employee.service')
    

//http:localhost:5000/api/employees/
router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(employee) 
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('Deleted successfully') 
})

router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send('created successfully.')
})

router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('Updated successfully.') 
})

module.exports = router;