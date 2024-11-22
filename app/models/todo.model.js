export default (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });

    return Todo;
  };
