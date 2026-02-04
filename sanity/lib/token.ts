import 'server-only'

export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

// Note: The token is protected by 'server-only' import which prevents
// this module from being imported in client components.
// React 19's experimental_taintUniqueValue is not available in React 18.
