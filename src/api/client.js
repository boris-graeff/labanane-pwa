class ApiError extends Error {
  constructor (response) {
    super()

    Object.assign(this, response)
  }
}

export default (baseUrl) => {
  const apiCall = async (url, requestConfig = {}) => {
    const response = await fetch(`${baseUrl}${url}`, { ...requestConfig })
    const responseContent = await response.json()

    if (!response.ok) throw new ApiError(responseContent)

    return responseContent
  }

  const post = (url, data) => apiCall(url, {
    body: JSON.stringify(data),
    method: 'POST'
  })

  const put = (url, data) => apiCall(url, {
    body: JSON.stringify(data),
    method: 'PUT'
  })

  const get = url => apiCall(url)

  const doDelete = url => apiCall(url)

  return {
    get,
    post,
    put,
    delete: doDelete
  }
}
