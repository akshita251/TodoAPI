const httpError = require('http-errors')
const router = require('express').Router()
const axios = require('axios')
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    header: { 'Access-Control-Allow_Origin': '*' }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await axiosInstance.get("/todos");
        todos = response.data
        todos.forEach(todo => {
            delete todo.userId
        });

        res.status(200).send(todos);

    } catch (error) {
        next(error.response)
    }
})

module.exports = router