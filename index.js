const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method === 'OPTIONS') {
    event.respondWith(handleOptions(request))
  } else {
    event.respondWith(handleRequest(request))
  }
})

const handleOptions = async (request) => {
  let headers = request.headers
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    let respHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ),
    }
    return new Response(null, {
      headers: respHeaders,
    })
  } else {
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}

const handleRequest = async (request) => {
  const { pathname, search } = new URL(request.url)
  const target = `https://opendata.ecdc.europa.eu/${pathname}${search}`
  const resp = await fetch(target)

  const newResponse = new Response(resp.body)
  newResponse.headers.append('Content-Type', 'application/json')
  newResponse.headers.append(
    'Access-Control-Allow-Origin',
    request.headers.get('ORIGIN'),
  )
  newResponse.headers.append('Vary', 'Origin')

  return newResponse
}
