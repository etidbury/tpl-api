/* eslint-env jest */
require('dotenv').config()

const axios = require('axios')
const urljoin = require('url-join')
const expect  = require('chai').expect

const {
    PORT,
    HOST
} = process.env

const clientUrl = `http://${HOST || 'localhost'}:${PORT}`

// A simple example test
describe('Basic tests', () => {
    it('Test hello', () => {
        return axios.get(
            urljoin(clientUrl,'api/hello')
        )
    })

    it('Test users endpoint', async () => {
        const { users } = await axios.get(
            urljoin(clientUrl,'api/hello')
        ).then(({ data })=>data)

        expect(users[0]).to.have.property('username')
    })
})