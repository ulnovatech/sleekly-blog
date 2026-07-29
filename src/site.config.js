/** SleeklyBuilt blog — shared brand + contact (operational email unchanged). */

export const siteConfig = {
  name: 'SleeklyBuilt',
  blogName: 'SleeklyBuilt Blog',
  teamName: 'SleeklyBuilt Team',
  tagline: 'Insights on building sleek websites, apps, and systems.',
  description:
    'Articles, tutorials, and updates from the SleeklyBuilt team — web development, product design, and digital growth.',
  email: 'ulnovatech@gmail.com',
  location: 'Kampala, Uganda',
  phones: ['+256 791779448', '+256 749594464', '+256 772169960'],
  primaryPhone: '+256791779448',
  homeUrl: import.meta.env.DEV ? 'http://localhost/ulnovatech/' : '/',
  social: {
    instagram: 'https://www.instagram.com/ulnovatech/?hl=en',
    linkedin: 'https://www.linkedin.com/in/ulnova-tech-394547376/',
    youtube: 'https://www.youtube.com/@UlnovaTech',
  },
}

export const apiEndpoints = {
  contact: '/php/contactus.php',
}
