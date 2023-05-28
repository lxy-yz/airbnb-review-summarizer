import { keywords } from '~/logic/storage'

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

export async function makePrompt() {
  const reviewsNode = await pollDOMUntilReady('[data-testid="pdp-reviews-modal-scrollable-panel"]', 10000)
  const allReviews = getAllTextFromNode(reviewsNode)
  return `I am an avid traveler who likes to stay in Airbnb.  Help me to summarize the airbnb listing reviews below make informed decision about whether this listing is a fit for me or not. A few things that I care about
${keywords.value.Books ? '- Has books to read' : ''}
${keywords.value.Sauna ? '- Has Sauna' : ''}
${keywords.value.Sleep ? '- Comfortness of bed and sleep environment' : ''}
${keywords.value['Safe Neighborhoo'] ? '- Safe neighborhood' : ''}

Listing reviews below: 
${allReviews}`
}

function getAllTextFromNode(node: Node | Element | null) {
  if (!node)
    return ''
  let text = ''
  if (node.nodeType === Node.TEXT_NODE)
    text += node.textContent
  for (let i = 0; i < node.childNodes.length; i++)
    text += getAllTextFromNode(node.childNodes[i])
  return text
}
