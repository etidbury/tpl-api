/* eslint-env jest */
require('dotenv').config()
import Client from 'lib/Client'

const urljoin = require('url-join')
const expect  = require('chai').expect

const {
    PORT,
    HOST
} = process.env

const clientUrl = `http://${HOST || 'localhost'}:${PORT}`

// A simple example test
describe('Basic tests', () => {
    it('Test users', () => {
        return Client.get(
            urljoin(clientUrl,'User')
        )
    })

})