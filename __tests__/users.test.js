/* eslint-env jest */
require('dotenv').config()
import Client from 'lib/Client'
import urljoin from 'url-join'
import { expect } from 'chai'

const {
    PORT,
    HOST
} = process.env

if (!PORT?.length){
    throw new TypeError('Required environment variables not set: PORT')
}

const clientUrl = `http://${HOST || 'localhost'}:${PORT}`

// A simple example test
describe('Basic tests', () => {
    it('Test users', () => {
        return Client.get(
            urljoin(clientUrl,'User')
        )
    })

})