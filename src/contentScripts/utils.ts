export const POLL_TIMEOUT = 10

export function pollDOMUntilReady(selector: string, timeout: number): Promise<Element> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const node = document.querySelector(selector)
      if (node) {
        clearInterval(interval)
        resolve(node)
      }
      else if (Date.now() - startTime > timeout * 1000) {
        clearInterval(interval)
        reject(new Error('Timeout exceeded'))
      }
    }, 1000)
  })
}
