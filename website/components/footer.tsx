import { Icon } from '@iconify/react'
import githubIcon from '@iconify/icons-mdi/github'

export default function Footer() {
  return (
    <footer className="">
      <div className="py-6 w-full flex justify-center">
        <a 
          href="https://www.producthunt.com/posts/airbnb-review-summarizer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-airbnb&#0045;review&#0045;summarizer" 
          target="_blank"
        >
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=397254&theme=light" alt="Airbnb&#0032;Review&#0032;Summarizer - Summarize&#0032;listing&#0032;reviews&#0032;to&#0032;be&#0032;useful | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
        </a>
      </div>
      <div className="relative">
        <a
          className="absolute bottom-0 right-0 py-2 px-4 z-50 rounded-tl-lg border-gray-400 border-t border-l border-dashed text-sm font-semibold opacity-95 hover:bg-base-200 hover:opacity-100 hover:border-solid"
          href="https://liallen.me"
          target="_blank"
          rel="noreferrer"
        >
          <div className="w-24 text-gray-500">
            Made by Allen{' '}
          </div>
        </a>
      </div>
    </footer>
  )
}
