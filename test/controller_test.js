const assert = require('assert')
const app = require("../app")
const request = require('supertest')
const Driver = require("../models/cardriver-model")
describe(" route test",()=>{
    it("create record test",(done)=>{
        request(app)
        .post("/api/driver")
        .send({email:"satyam.it@gmail.com"})
        .end(()=>{
           // assert(request.body=="satyam.aiiit@gmail.com")
             
            done()
        })
    })
    it("put route test",(done)=>{
        const driver = new Driver({email:"satyam.aiit",driving:false})
        driver.save()
        .then(()=>{
            request(app)
            .put(`/api/driver/${driver.id}`)
            .send({driving:true})
            .end(()=>{
                Driver.findOne({_id:driver.id})
                .then((driver)=>{
                    console.log(driver);
                    done()
                    
                })

            })
            
        })
    })
    it("delete route test",(done)=>{
        const driver = new Driver({email:"satyam.aiit",driving:false})
        driver.save()
        .then(()=>{
            request(app)
            .delete(`/api/driver/${driver.id}`)
            .end(()=>{
                Driver.findOne({_id:driver.id})
                .then((driver)=>{
                    console.log(driver);
                    done()
                })
            })
        })
    })
    it("get response test ",(done)=>{
        const delhiDriver = new Driver({
            email:"satyam.aiit",
            
            geoLocation:{type:'Point',coordinates:[-122.44342,47.98786]}
        })

        const patnaDriver = new Driver({
            email:"satyam.aiiii",
            geoLocation:{type:"Point",coordinates:[-80.4334,25.9770909]}

        })

        Promise.all([delhiDriver.save(),patnaDriver.save()])
        .then(() => {
            request(app)
            .get('/api/driver?lng=-80&lat=25')
            .end((err,response)=>{
                console.log(response);
                done()
                

            })
            
        }).catch((next) => {
            next()
        });

    })
})