addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const handleRequest = async (request) => {
  const { pathname, search } = new URL(request.url)
  const url = `https://opendata.ecdc.europa.eu/${pathname}${search}`
  const resp = await fetch(url)

  const newResponse = new Response(resp.body, resp)
  newResponse.headers.append('Access-Control-Allow-Origin', '*')
  newResponse.headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )

  return newResponse
}
