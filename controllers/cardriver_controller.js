const Driver=  require('../models/cardriver-model')


module.exports={
    getDrivers(req,res,next){
       Driver.find()
       .then((driver)=>{
           res.send(driver)
           driver.map((item)=>console.log(item.email)
           )
       })
    },
    index(req,res,next){

        const {lng,lat}= req.query;
        
        Driver.aggregate([
            {
              $geoNear: {
                 near: { type: "Point", coordinates: [parseFloat(-73.99279) , parseFloat(40.719296) ] },
                 distanceField: "dist.calculated",
                 maxDistance: 2,
                 query: { type: "public" },
                 includeLocs: "dist.location",
                 num: 5,
                 spherical: true
              }
            }
         ])
     .then((result)=>{
        console.log(result);
         res.send(result.body)
         
     })
    },


    create(req,res,next){
       const driverProps = req.body
        Driver.create(driverProps)
        .then((driver)=>{
            res.send(driver)
        })
        .catch(next)
     
    },

    edit(req,res,next){
        const DriverId= req.params.id
        const driverProps = req.body
        Driver.findByIdAndUpdate({_id:DriverId},driverProps)
        .then(()=>Driver.findById({_id:DriverId}))
        .then((driver)=>res.send(driver))
        .catch(next)
    },

    delete(req,res,next){
       const DriverId= req.params.id
       Driver.findByIdAndRemove({_id:DriverId})
       .then((driver)=>res.status(204).send(driver))
       .catch(next)
    }
}