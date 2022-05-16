const Joi = require("joi");

const JoiDate = require('joi')
    .extend(require('@joi/date'));

 JoiDate.date().format('YYYY-MM-DD').utc();
const employee = Joi.object({
    name: Joi.string().required(),
    fathername: Joi.string().required(),
    salary: Joi.number().required(),
    joiningDate: JoiDate.date().format('YYYY-MM-DD').utc().required(),
    post: Joi.string().required(),
    qualification: Joi.string().required(),
    gender:Joi.string().required(),
    departmentname: Joi.string().required(),
    location: Joi.string().required(),

});

module.exports = employee;