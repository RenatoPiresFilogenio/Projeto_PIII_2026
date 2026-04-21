const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8000/api'

export class ApiError extends Error {
  constructor(message, { status = null, data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value)
}

function resolveBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()
  return (configuredUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, '')
}

function buildUrl(path) {
  if (!path) {
    return resolveBaseUrl()
  }

  if (isAbsoluteUrl(path)) {
    return path
  }

  return `${resolveBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

function flattenErrorDetail(detail) {
  if (!detail) {
    return ''
  }

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => flattenErrorDetail(item))
      .filter(Boolean)
      .join(' ')
  }

  if (typeof detail === 'object') {
    return Object.entries(detail)
      .map(([field, value]) => {
        const message = flattenErrorDetail(value)
        return message ? `${field}: ${message}` : ''
      })
      .filter(Boolean)
      .join(' ')
  }

  return ''
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { detail: text } : null
}

export async function apiRequest(path, options = {}) {
  const { body, headers, ...rest } = options

  const requestHeaders = new Headers(headers || {})

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const response = await fetch(buildUrl(path), {
    ...rest,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    throw new ApiError(
      flattenErrorDetail(data) || 'Não foi possível concluir a requisição para a API.',
      { status: response.status, data }
    )
  }

  return data
}

export async function fetchPaginatedCollection(path) {
  const collectedItems = []
  let nextPath = path
  let safetyCounter = 0

  while (nextPath) {
    safetyCounter += 1

    if (safetyCounter > 25) {
      throw new ApiError('A paginação da API excedeu o limite esperado durante a leitura dos dados.')
    }

    const data = await apiRequest(nextPath)

    if (Array.isArray(data)) {
      return data
    }

    if (!data || !Array.isArray(data.results)) {
      return collectedItems
    }

    collectedItems.push(...data.results)
    nextPath = data.next || null
  }

  return collectedItems
}
