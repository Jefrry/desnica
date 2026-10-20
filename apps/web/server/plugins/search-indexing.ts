export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const { indexingAllowed } = useRuntimeConfig(event)

    if (String(indexingAllowed).toLowerCase() !== 'true') {
      setResponseHeader(event, 'X-Robots-Tag', 'noindex')
    }
  })
})
