const fetch = require('node-fetch')

export class DovMusic {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    async fetchData(method, artist) {
        const baseUrl  = 'https://ws.audioscrobbler.com/2.0/?format=json'
        const apiUrl   = `api_key=${this.apiKey}`
        let result
        const response = await fetch(`${baseUrl}&method=${method}&artist=${artist}&${apiUrl}`)
        result         = await response.json()
        return result.error ? undefined : result
    }
}

