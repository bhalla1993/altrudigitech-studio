import hostsConfig from '../../../config/hosts.json'

/** @type {Record<string, { slug: string, client_id: string, lead_email?: string }>} */
const HOSTS = hostsConfig.hosts ?? {}

export function lookupHost(hostname) {
  return HOSTS[hostname] ?? null
}

export function knownHostnames() {
  return Object.keys(HOSTS)
}