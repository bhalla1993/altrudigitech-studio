import localTopSpotThumbnail from '../assets/images/LocalTopSpot-optimized.jpg'
import resumeThumbnail from '../assets/images/Resume-optimized.jpg'
import sparkShotsThumbnail from '../assets/images/SparkShots-optimized.jpg'
import { brand, studioLabs } from './siteData'

const localTopSpotLab = studioLabs.find((lab) => lab.title === 'LocalTopSpot')

export const liveProjects = [
  {
    id: 'shivabhalla-portfolio',
    title: 'Shiva Bhalla — Student resume showcase',
    description:
      `Professional resume on ${brand.subdomainExample.replace('your-business', 'shivabhalla')} — AltruDigiTech lead form, Turnstile, and studio subdomain hosting (student Starter family).`,
    badge: 'Student showcase',
    ctaLabel: 'Visit shivabhalla.altrudigitech.com',
    url: 'https://shivabhalla.altrudigitech.com/',
    thumbnail: resumeThumbnail,
  },
  {
    id: 'sparkshots-photography-website',
    title: 'SparkShots Photography Website',
    description: `Client site for a GTA photo booth business—built and maintained by ${brand.clientSiteCredit}.`,
    badge: 'Live Project',
    ctaLabel: 'Visit Live Site',
    url: 'https://www.sparkshots.ca',
    thumbnail: sparkShotsThumbnail,
  },
  {
    id: 'localtopspot-durham-directory',
    title: localTopSpotLab?.title ?? 'LocalTopSpot',
    description: `Studio Lab — ${localTopSpotLab?.description ?? 'Durham Region trades directory at localtopspot.ca.'}`,
    badge: 'Studio Lab',
    ctaLabel: 'Visit localtopspot.ca',
    url: localTopSpotLab?.url ?? 'https://localtopspot.ca',
    thumbnail: localTopSpotThumbnail,
    thumbnailObjectPosition: 'top center',
    thumbnailHeight: { xs: 228, md: 252 },
    thumbnailOverlay: 'light',
  },
]
