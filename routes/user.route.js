const httpError = require('http-errors')
const router = require('express').Router()
const axios = require('axios')
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    header: { 'Access-Control-Allow_Origin': '*' }
})

router.get('/:user_id', async (req, res, next) => {
    try {
        user_id = parseInt(req.params.user_id)
        //check for user_id
        if(user_id == null) throw httpError.BadRequest('User Id not found')
        if(isNaN(user_id)) throw httpError.BadRequest('Invalid user id')

        const users = await axiosInstance.get("/users/" + user_id);
        user_data = users.data

        const todo_response = await axiosInstance.get("/todos");
        todos = todo_response.data
        matching_todos = todos.filter(todo => todo.userId == user_id)

        user_data['todos'] = matching_todos

        res.status(200).send(user_data);

    } catch (error) {
        next(error.response)
    }
})

module.exports = router