const models = require('../models');

/**
 * Get Todos List
 */
exports.list = function (req, res) {
    models.Todo
        .findAll({
            where: {
                completed: 0,
                userId: req.user.id
            }
        })
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
}

/**
 * Get Todo
 */
exports.view = function (req, res) {
    const id = req.params.id;
    console.log(req);

    models.Todo
        .findByPk(id).then(todo => {
            if (todo.userId === req.user.id) {
                res.json(todo);
            } else {
                res.status(403).json('You don\'t access to this resource');
            }

        })
        .catch(err => console.log(err));

}

/**
 * Create Todo
 */
exports.create = function (req, res) {
    console.log(req);
    let { title } = req.body;


    // Validate Fields
    if (!title) {
        res
            .status(409)
            .json({ message: 'Please add a title' });
    }

    models.Todo
        .build({
            title,
            userId: req.user.id
        })
        .save()
        .then(todo => { res.status(201).json('Created successfully') })
        .catch(err => console.log(err));
}

/**
 * Update Todo
 */
exports.update = function (req, res) {
    const id = req.params.id;
    let { title, completed = false } = req.body;

    // Validate Fields
    if (!title) {
        res
            .status(409)
            .json({ message: 'Please add a todo' });
    }

    models.Todo
        .findByPk(id)
        .then(todo => {
            if (todo.userId === req.user.id) {
                todo
                    .update({
                        title,
                        completed,
                        userId: req.user.id
                    })
                    .then(todo => res.status(201).json('Updated successfully'))
                    .catch(err => console.log(err));
            } else {
                res.status(403).json('You don\'t access to this resource');
            }

        }).catch(err => console.log(err));
}

/**
 * Delete Todo
 */
exports.delete = function (req, res) {
    const id = req.params.id;
    models.Todo
        .findByPk(id)
        .then(todo => {
            if (todo.userId === req.user.id) {
                todo
                    .destroy()
                    .then(todo => res.status(204).json(''))
                    .catch(err => console.log(err));
            } else {
                res.status(403).json('You don\'t access to this resource');
            }

        }).catch(err => console.log(err));
}