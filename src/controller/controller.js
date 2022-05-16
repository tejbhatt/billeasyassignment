require('dotenv').config()
const models = require("../../models/index");

const Sequelize=require("sequelize")
const Op = Sequelize.Op;
const employeesecheme=require("../schemas/employee.scehema")
module.exports = {

  addemploy: async (req, res, next) => {
    try 
    {
      const body = await employeesecheme.validateAsync(req.body);
      const{name, fathername,salary,joiningDate,post,qualification,gender,departmentname,location}=body;
      let newEmployee=await models.Employee.create({
        name, 
        fathername,
        salary,
        joiningDate,
        post,
        qualification,
        gender
      })
      let addDepartment=await models.Department.create({
        name:departmentname,
        location,
        EmployeeId:newEmployee.id 
      })
      if(newEmployee && addDepartment)
      {
        return res.json({
          message: "New Employee is Added",
          error: null,
          success: true,
        });
      }

    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

  byid: async (req, res, next) => {
    try 
    {
      const id=req.params.id

      let employee=await models.Employee.findByPk(id,{
        include:[
          models.Department
        ]
      })
      if(!employee)
      {
        throw new Error(" Invalid Id ")
      }
        return res.json({
          message: "Employee Found",
          data:employee,
          error: null,
          success: true,
        });
      
      
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

  allEmployee: async (req, res, next) => {
    try 
    {
      console.log("date : ",req.query.date)
      if (req.query.date=="null")
      {
        console.log("false")
        let employee=await models.Employee.findAndCountAll({
          include:[
            models.Department
          ]
        })
        if(!employee)
        {
          throw new Error(" NO employee Found")
        }
          return res.json({
            message: "Employees Found",
            totalEmployee:employee.count,
            data:employee.rows,
            error: null,
            success: true,
          });
      }
      else
      {
        console.log("true")
        let employee=await models.Employee.findAndCountAll({
          include:[
            models.Department
          ],
          where: {
            joiningDate:req.query.date
          }
        })
        if(!employee)
        {
          throw new Error(" NO employee Found")
        }
          return res.json({
            message: "Employees Found",
            totalEmployee:employee.count,
            data:employee.rows,
            error: null,
            success: true,
          });
      }
     
     
      
      
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

  employees: async (req, res, next) => {
    try 
    {
      let employee=await models.Department.findAndCountAll({
        include:[
          models.Employee
        ]
      })
      if(!employee)
      {
        throw new Error(" NO employee Found")
      }
        return res.json({
          message: "Employees Found",
          totalDepartments:employee.count,
          data:employee.rows,
          error: null,
          success: true,
        });
      
      
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },

}

// Create an API using Node.js, you are free to use any framework for this of your choice (preferred Strongloop)

 

// Linking with PostGres database creating basic tables which should have employee data.

 

// The API should return data of the employee querying joins from different tables and show a result set to a specific employee ID.

 

// Design a Database table structure in POSTGRESQL from the above.

// Create a Trigger on the Employee table.

// Maintain a count of employees in each department(REFERENCE to department table) - trigger should increase the count as and when the employee is inserted.

// Submit insert scripts also.


// Create a function in DB to return JSON of all employee details in a department based on the time they joined the company (time range filter along with department filter)


// Revoke this database function from API in NodeJs accepting parameters also in the API itself.