importScripts('/uv/uv.bundle.js')
importScripts('/uv/uv.config.js')
importScripts('/uv/uv.sw.js')
importScripts('/scramjet/scramjet.shared.js')
importScripts('/scramjet/scramjet.worker.js')

const uv = new UVServiceWorker()
const scramjet = new ScramjetServiceWorker()

async function handleRequest(event) {
  await scramjet.loadConfig()
  if (uv.route(event)) {
    return await uv.fetch(event)
  }
  if (scramjet.route(event)) {
    return await scramjet.fetch(event)
  }

  return await fetch(event.request)
}

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})