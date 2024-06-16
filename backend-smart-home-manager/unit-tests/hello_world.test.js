
jest.setTimeout(3000);
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const request = supertest(app)
const { expect } = require('@jest/globals');

const payload = {
  "user_id": "2ac90127-c637-4b16-9e93-409bf27a02b9",
}

const token = (is_admin = false) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
};


const headers = {
  "Authorization": 'Bearer ' + token(),
}


const postRequest = async (url, body) => {
  return Promise.resolve(await request.post(url).send(body).set(headers));
}

const getRequest = async (url) => {
  return Promise.resolve(await request.get(url).set(headers));
}

const deleteRequest = async (url) => {
  return Promise.resolve(await request.delete(url).set(headers));
}

const putRequest = async (url, body) => {
  return Promise.resolve(await request.put(url).send(body).set(headers));
}

const recursiveObjectExpectation = (expected, received) => {
  if (typeof expected !== "object" || Array.isArray(expected)) {
    expect(received).toEqual(expected);
    return;
  }
  Object.keys(expected).forEach(key => {
    if (typeof expected[key] === "object" && !Array.isArray(expected[key])) {
      recursiveObjectExpectation(expected[key], received[key]);
    } else if (Array.isArray(expected[key])) {
      expect(received[key]).toHaveLength(expected[key].length);
      expected[key].forEach((item, index) => {
        recursiveObjectExpectation(item, received[key][index]);
      });
    } else {
      expect(received[key]).toEqual(expected[key]);
    }
  });
};

describe('GET /hello-world', function () {
  it('Hello world dan success', async function () {
    const response = await getRequest('/hello-world');
    const expected = { "message": "success", "data": { "message": "Hello World" } }
    recursiveObjectExpectation(expected, response.body)
  });
});
