const cardriverController = require("../controllers/cardriver_controller")


module.exports =(app)=>{
  app.get("/api/drivers", cardriverController.getDrivers)

  app.post("/api/driver",cardriverController.create)

  app.put("/api/driver/:id",cardriverController.edit)

  app.delete("/api/driver/:id",cardriverController.delete)

  app.get("/api/driver",cardriverController.index)
}