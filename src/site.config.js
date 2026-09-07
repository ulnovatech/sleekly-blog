/** SleeklyBuilt blog — shared brand + contact (operational email unchanged). */

export const siteConfig = {
  name: 'SleeklyBuilt',
  blogName: 'SleeklyBuilt Blog',
  teamName: 'SleeklyBuilt Team',
  tagline: 'Insights on building sleek websites, apps, and systems.',
  description:
    'Articles, tutorials, and updates from the SleeklyBuilt team — web development, product design, and digital growth.',
  email: 'sales@sleeklybuilt.pro',
  location: 'Kampala, Uganda',
  phones: ['+256 791779448', '+256 749594464', '+256 772169960'],
  primaryPhone: '+256791779448',
  homeUrl: import.meta.env.DEV ? 'http://localhost/sleeklybuilt/' : '/',
  publicSiteUrl: 'https://sleeklybuilt.pro',
  whatsapp: 'https://wa.me/256749594464',
  social: {
    instagram: 'https://www.instagram.com/sleeklybuilt/?hl=en',
    linkedin: 'https://www.linkedin.com/company/sleeklybuilt/',
    youtube: 'https://www.youtube.com/@SleeklyBuilt',
  },
}

export const apiEndpoints = {
  contact: '/php/contactus.php',
}
