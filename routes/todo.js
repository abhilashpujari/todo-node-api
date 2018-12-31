const express = require('express');
const router = express.Router();
const todo_controller = require("../controllers/todo");
const auth = require("../middlewares/passport")();

router.route('/')
    .get(auth.authenticate(), todo_controller.list);

router.route('/:id')
    .get(auth.authenticate(), todo_controller.view);

router.route('/')
    .post(auth.authenticate(), todo_controller.create);

router.route('/:id')
    .put(auth.authenticate(), todo_controller.update);

router.route('/:id')
    .delete(auth.authenticate(), todo_controller.delete);

module.exports = router;