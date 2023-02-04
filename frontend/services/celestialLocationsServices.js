import axios from 'axios'
import { getIP } from '../utils/ip'

const API = axios.create({ baseURL: 'http://' + getIP() + '/api/celestialLocations' })

/* Variables provided by frontend:
coordinates = {
    longitude: Number,
    latitude: Number,
}
timeOffset = {
    minutes: Number,
    hours: Number,
    days: Number,
}

*/

// -------------

// POST: /getAllObjects
/* returns => {
    planets: [
        {
            name: String,
            azimuth: Number,
            altitude: Number,
            distance: Number (AU)
        },
        ...
    ],
    stars: [
        ...
    ],
    galaxies: [
        ...
    ],
    satellites: [
        ...
    ],
    constellations: [
        ...
    ]
} */
const getAllObjects = async (coordinates) => {
    try {
        const res = await API.get('/getAllObjects')
        return res
    } catch (e) {
        console.log(e)
        return e
    }
}

// POST: /getObjectAtDate
/* returns => {
    name: String,
    azimuth: Number,
    altitude: Number,
    distance: Number (AU)
}*/
const getObjectAtTime = async (coordinates, timeOffset) => {
    try {
        const res = await API.get('/getObjectAtTime')
        return res
    } catch (e) {
        console.log(e)
        return e
    }
}