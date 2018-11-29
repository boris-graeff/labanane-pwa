import axios from 'axios'
import constants from '../constants'

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

const MAX_RESULTS = 20

export const search = keywords => youtube.get('/search', {
  params: {
    part: 'snippet',
    type: 'video',
    key: constants.YOUTUBE_API_KEY,
    q: keywords,
    maxResults: MAX_RESULTS
  }
})

export const getVideoDetails = id => youtube.get('/videos', {
  params: {
    id,
    part: 'contentDetails',
    key: constants.YOUTUBE_API_KEY
  }
})
