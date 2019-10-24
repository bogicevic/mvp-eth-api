module.exports = app => {
  const controller = require('./controller');

  app
    .route('/balance')
    .get(controller.getBalance)

//   app
//     .route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);
};
