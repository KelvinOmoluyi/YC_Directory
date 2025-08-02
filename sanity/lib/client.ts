import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-10-01', // Use the same version as in your .env.local file
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
