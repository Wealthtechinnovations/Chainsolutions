export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.chainsolutions.fr/sitemap.xml',
    host: 'https://www.chainsolutions.fr',
  }
}
