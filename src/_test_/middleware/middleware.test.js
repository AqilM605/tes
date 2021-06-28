const app = require('../../../index')
const supertest = require('supertest')
const request = supertest(app)

describe('Middleware', () => {
  it('should return 400 when empty body ', async () => {
    const response = await request.post('/api/user/')
    expect(response.status).toEqual(400)
  });
})
