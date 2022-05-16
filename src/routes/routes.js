const router = require("express").Router();

const {
  addemploy,byid,allEmployee,employees

} = require("../controller/controller");


router.post(
  "/addemployee",
  addemploy
);
router.get(
  "/employee/:id",
  byid
);
router.get(
  "/employee",
  allEmployee
);
router.get(
  "/department",
  employees
);


module.exports = router;

