const pingUrl = async (url) => {
  const abortController = new AbortController()
  const timeoutId = setTimeout(() => {
    abortController.abort()
    console.log('timeout')
  }, 5000)
  try {
    const startTime = performance.now()
    await fetch(url, {
      signal: abortController.signal,
      cache: 'no-store',
      credentials: 'omit',
      redirect: 'error'
    })
    const endTime = performance.now()
    const elapsed = endTime - startTime

    clearTimeout(timeoutId)
    return elapsed
  } catch (e) {
    console.log(e)
    console.log('error')
  }
}

const establishConnection = async (url) => {
  await pingUrl(url)
  await pingUrl(url)
  return await pingUrl(url)
}


export default establishConnection
