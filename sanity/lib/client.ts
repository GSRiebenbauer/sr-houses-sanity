import { createClient } from 'next-sanity'

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
  writeToken,
} from '@/sanity/lib/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token:
    'skfFBVrDlZ6004gcsiAzVNG9gm0JUlZ3q1WEQ0VzQBA3jJamFBe3qSisgTMwGq8Edz9xOstfhsJYYBQXqwNEMvE1Yc5jAQXDsIHnt4narlav3vjxQgdsxfAKXe3HNz539kQqrD81ZPQyKPC8QDjLIUvPNxMNwrQeEf9PqjgZ1XOBw4EhAY92',
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
  perspective: 'published',
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})

console.warn(
  'This template is using stega to embed Content Source Maps, see more information here: https://www.sanity.io/docs/loaders-and-overlays#26cf681fadd4',
)
