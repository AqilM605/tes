const app = require('../../../index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const db = require('../helpers/db')

beforeAll(async () => await db.connect())
// afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.close())


let _id

describe('/api/user/', () => {


  describe('POST', () => {
    it('should insert data when called ', async () => {

      const user = {
        "userName": "Akillalano",
        "fullName": "Alan",
        "email": "something@something.com",
        "password": "$SCad#2x1"
      }
      const response = await request.post('/api/user/').send(user)

      expect(response.status).toEqual(201)
      expect(response.body).toMatchObject(expect.objectContaining(user))

      _id = response.body._id

    });
    describe('PUT', () => {
      it('should change UserName to Alan', async () => {

        const user = {
          "userName": "Alan",
        }
        const response = await request.patch("/api/user/" + _id).send(user);

        expect(response.status).toEqual(200)
        expect(response.body.userName).toEqual("Alan")

        _id = response.body._id
      });

      it('should fail due to unknown id ', async () => {
        const user = {
          "userNames": "Akillalano",
        }
        const response = await request.patch("/api/user/60d44e393c8bcf1e4cd250ef")
        expect(response.status).toEqual(404)
        expect(response.body).toEqual({message: "Cannot update user with id= 60d44e393c8bcf1e4cd250ef. Failed to find user with that id"})
      });
    })
    describe('GET', () => {

      it('should return data by id', async () => {
        const response = await request.get("/api/user/" + _id);
        expect(response.body._id).toEqual(_id)
        console.log(_id + "tes")
      })
      it('should return all data ', async () => {
        const response = await request.get("/api/user");
        expect(response.status).toBe(200)
      });
    })

    describe('DELETE', () => {
      it('should  delete data by id', async () => {
        const response = await request.delete("/api/user/" + _id);
        expect(response.body).toEqual({"message": "user was deleted successfully!"})
      })
      it('should fail due to id not found', async () => {
        const response = await request.delete("/api/user/" + _id);
        expect(response.body).toEqual({"message": "Cannot delete user with id=" + " " + _id + ". Maybe Transaction was not found!"})
      })
    })
  })
})





