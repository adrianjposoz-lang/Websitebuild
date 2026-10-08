/** A video's own YouTube thumbnail, self-hosted so no request leaves the site before a play click. */
export function videoThumbnail(videoId: string): string {
  return `/video-thumbs/${videoId}.jpg`;
}
