import client from './client'
import constants from '../constants'

const youtube = client('https://www.googleapis.com/youtube/v3')

const MAX_RESULTS = 20

export const search = (keywords) => youtube.get('/search', {
  params: {
    part: 'snippet',
    type: 'video',
    key: constants.YOUTUBE_KEY,
    q: keywords,
    maxResults: MAX_RESULTS
  }
})

export const getDetails = (id) => youtube.get('/videos', {
  params: {
    id,
    part: 'contentDetails',
    key: constants.YOUTUBE_KEY
  }
})
