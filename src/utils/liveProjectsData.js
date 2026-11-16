import localTopSpotThumbnail from '../assets/images/LocalTopSpot-optimized.jpg'
import resumeThumbnail from '../assets/images/Resume-optimized.jpg'
import sparkShotsThumbnail from '../assets/images/SparkShots-optimized.jpg'
import { brand, studioLabs } from './siteData'

const localTopSpotLab = studioLabs.find((lab) => lab.title === 'LocalTopSpot')

export const liveProjects = [
  {
    id: 'single-page-resume-example',
    title: 'Single-Page Resume Example',
    description: 'A clean, modern single-page resume built for students and professionals.',
    badge: 'Live Project',
    ctaLabel: 'View Live Demo',
    url: 'https://bhalla1993.github.io/shivabhallaportfolio.github.io',
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
