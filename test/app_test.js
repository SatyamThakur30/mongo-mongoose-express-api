const assert= require('assert')
const app = require('../app')
const request = require('supertest')


describe("test for express",()=>{
    it("get route test",(done)=>{
      
        request(app)
        .get('/api')
        .end((err,response)=>{
            console.log(response.body);
            done()
        })
    })
})