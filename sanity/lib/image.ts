import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  // Only try to build if it's a valid Sanity image object
  if (source?.asset?._ref) {
    return builder.image(source).url();
  }

  // If it's already a string (e.g., from GitHub), just return it directly
  if (typeof source === 'string') {
    return source;
  }

  // Fallback placeholder
  return "https://placehold.co/48x48";
}
