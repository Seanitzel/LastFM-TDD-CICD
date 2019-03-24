import {DovMusic} from '../src/DovMusic'
import {expect}   from 'chai'

const dbStub = {
    'artist.getinfo':      {
        'artist': {
            'muse': {
                'url':       'https://www.last.fm/music/Muse',
                'summary':   'Muse are an alternative rock band from Teignmouth, England, United Kingdom.',
                'similar':   'radiohead',
                'toptracks': ['track1', 'track2', 'track3'],
            },
        },
    },
    'chart.getTopArtists': {
        artists: {
            artist: [
                {
                    name: 'radiohead',
                },
                {
                    name: 'muse',
                },
                {
                    name: 'beyonce',
                },
            ],
        },
    },
    'artist.getSimilar':   {
        'muse':    {
            similarartists: {
                artist: [
                    {
                        name: 'radiohead',
                    },
                ],
            },
        },
        'beyonce': {
            similarartists: {
                artist: [
                    {
                        name: 'radiohead',
                    }, {
                        name: 'muse',
                    },
                ],
            },
        },
    },
    'artist.getTopTracks': {
        'muse':      {
            'toptracks': {
                'track': [
                    {
                        name: 'creep',
                    },
                    {
                        name: 'starlight',
                    },
                ],
            },
        },
        'radiohead': {
            'toptracks': {
                'track': [
                    {
                        name: 'creep',
                    },
                ],
            },
        },
        'beyonce':   {
            'toptracks': {
                'track': [
                    {
                        name: 'girls',
                    },
                    {
                        name: 'jay-z',
                    },
                ],
            },
        },
    },
}

class DovMusicMock extends DovMusic {

    async superFetchData(method, artist = false) {
        return super.fetchData(method, artist = false)
    }

    async fetchData(method, artist = false) {
        //Returns a promise of the ajax request to the data base
        if (artist) {
            return new Promise((res) => {
                if (method === 'artist.getSimilar' || method === 'artist.getTopTracks') {
                    res(dbStub[method][artist])
                } else {
                    res(dbStub[method]['artist'])
                }
            })
        }
        return new Promise((res) => {
            res(dbStub[method])
        })
    }
}

let mock
beforeEach(() => {
    mock = new DovMusicMock('123')
})

describe('Dov Music', () => {
    describe('Unit Level', () => {
        describe('#fetchData', function () {
            it('can fetch data by kind of data and a valid input', async () => {
                expect(await mock.fetchData('artist.getinfo', 'muse')).to.be.eql(dbStub['artist.getinfo']['artist'])
            })

            it('returns undefined when kind of data is not found', async () => {
                expect(await mock.fetchData('nonExistent')).to.be.undefined
            })

            it('returns object when kind of data exists but the input is not', async () => {
                expect(await mock.fetchData('artist.getinfo', 'nonExistent')).to.be.an('object')
            })

            it('gets response when making a real request to the api', async () => {
                expect(await mock.superFetchData('artist.getinfo', 'muse')).to.be.undefined
            })
        })
    })
})
