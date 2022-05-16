'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.hasOne(models.Department)
    }
  };
  Employee.init({
    name: DataTypes.STRING,
    fathername: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    joiningDate: DataTypes.DATEONLY,
    post: DataTypes.STRING,
    qualification: DataTypes.STRING,
    gender:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};