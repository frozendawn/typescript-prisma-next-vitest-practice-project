import { it, vi, describe, expect } from "vitest";
import { createUserResponseInterface } from '../pages/api/create-user'

const testFetch = vi.fn((url: string, options) => {
  return new Promise((resolve, reject) => {

    const body = JSON.parse(options.body)
    if (!body?.username || !body?.email || !body?.password) {

      const unsuccessfullResponse = {
        ok: true,
        json() {
          return new Promise((resolve, reject) => {
            resolve({
              message: "You need to provide username, email, password.",
              success: false,
            })
          })
        }
      }

      resolve(unsuccessfullResponse)
    }

    const successFullResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve({
            message: "User created.",
            success: true,
            data: {
              id: '123',
              username: body.username,
              email: body.email,
            }
          })
        })
      }
    }

    resolve(successFullResponse)
  })
});

vi.stubGlobal('fetch', testFetch)

describe("Testing /api/create-item", () => {
  it('Should create user with the provided input.', async () => {

    const userInput = {
      username: "test",
      email: "test@test.com",
      password: "password123"
    }

    const expectedTestCaseData: createUserResponseInterface = {
      message: "User created.",
      success: true,
      data: {
        id: '123',
        username: userInput.username,
        email: userInput.email,
      }
    }

    const createUserResponse = await fetch('http://localhost:3000/api/create-item', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })

    const data = createUserResponse.json()

    expect(data).resolves.toEqual(expectedTestCaseData)
  })

  it("Should return success: false if the user hasn't provided username, password, email.", async () => {

    const userInput = {
      username: "test",
      email: "test@test.com",
    }

    const expectedOutput = {
      message: 'You need to provide username, email, password.',
      success: false
    }

    const createUserResponse = await fetch('http://localhost:3000/api/create-item', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })

    const createUserData = createUserResponse.json();

    expect(createUserData).resolves.toEqual(expectedOutput)
  })
})