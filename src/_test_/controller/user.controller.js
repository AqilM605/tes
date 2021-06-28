// const userController = require("../../app/controllers/user.controller")
// const db = require('../helpers/db')
// const {mockResponse} = require("jest-mock-req-res");
// const {mockRequest} = require("jest-mock-req-res");
//
// beforeAll(async () => await db.connect())
// // afterEach(async () => await db.clearDatabase())
// afterAll(async () => await db.close())
//
//
// const req = mockRequest();
// const res = mockResponse();
//
//
//
//
// it('should return all records', async () => {
//   //positive test
//
//   // try {
//   //
//   //   await userController.get(req, res);
//   //   // expect(res.status).toHaveBeenCalledWith(500)
//   // }
//   //   //negative test
//   // catch (e) {
//   //   expect(e).toEqual("empty records")
//   //   // expect(res.status).toHaveBeenCalledWith(500)
//   //
//   // }
//
// });
//
// describe("controller testing",()=>{
//
//
//
//
//   it('should insert data when called ', async () => {
//
//
//     const user = {
//       "userName": "Akillalano",
//       "fullName": "Alan",
//       "email": "something@something.com",
//       "password": "$SCad#2x1"
//     }
//     const req = mockRequest({
//       body: user
//     });
//
//     await userController.create(req, res);
//     await console.log(res.status)
//     // expect(res.status).toHaveBeenCalledWith(201)
//     // expect(res.json).toHaveBeenCalledWith(expect.objectContaining(user))
//   });
//
//   it('should reject insertion because missing password ', async () => {
//     const user = {
//       "userName": "Akillalano",
//       "fullName": "Alan",
//       "email": "something@something.com",
//     }
//     const req = mockRequest({
//       body: user
//     });
//
//
//     await userController.create(req, res);
//     expect(res.status).toHaveBeenCalledWith(400)
//     expect(res.json).toHaveBeenCalledWith({"message": "User validation failed: password: Path `password` is required."})
//
//   });
//
//
//
//
//
// })
//
