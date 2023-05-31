export default function Footer() {
  return (
    <footer className="relative justify-self-end">
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
    </footer>
  )
}