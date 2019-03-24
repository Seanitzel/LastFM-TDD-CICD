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

    async getArtistInfo(artist) {
        //Returns an object with the artist data from the db
        let result = await this.fetchData('artist.getinfo', artist)
        return result[artist]
    }

    async getTopArtists() {
        //Returns an array of the current top artists from the db
        let result     = await this.fetchData('chart.getTopArtists')
        let topArtists = []
        result.artists.artist.forEach(curArtist => {
            topArtists.push(curArtist.name)
        })
        return topArtists
    }

    async getTopTracks(artist) {
        //Return an array of top tracks of the artist from the db
        let result     = await this.fetchData('artist.getTopTracks', artist)
        let trackNames = []
        if (result) {
            result.toptracks.track.forEach(song => {
                trackNames.push(song.name)
            })
            return trackNames
        }
        return undefined
    }

    async getSimilar(artist) {
        //Returns an object with the similar artists from the db
        let result = await this.fetchData('artist.getSimilar', artist)
        return result ? result.similarartists.artist : undefined
    }
}

