import constants from '@/constants.json'
import axios from 'axios'

const soundcloudApiKey = constants.SOUNDCLOUD_API_KEY
const soundcloudBaseURL = 'https://api.soundcloud.com'
const MAX_RESULTS = 20

const soundcloud = axios.create({
  baseURL: soundcloudBaseURL
})

export const getTrackUrl = trackId => `${soundcloudBaseURL}/tracks/${trackId}/stream?client_id=${soundcloudApiKey}`

export const search = keywords => soundcloud.get('/tracks', {
  params: {
    q: keywords,
    limit: MAX_RESULTS,
    client_id: soundcloudApiKey
  }
})
