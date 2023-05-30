import { DOWNLOAD_URL } from '../constants'

export default function Main() {
  return (
    <section className="text-gray-600 body-font flex items-center min-h-[calc(100vh)] mt-[80px] mb-[52px] lg:mt-0">
      <div className="max-w-6xl mx-auto flex px-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow w-1/2 md:ml-4 p-6 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
            Airbnb review summarizer
          </h1>
          <div className="flex gap-2">
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              {/* Make Airbnb listing reviews great again. */}
              Summarize Airbnb listing reviews to be simple, personal and
            <span className="
            font-semibold text-transparent text-2xl -mt-[3px] ml-1 bg-clip-text
            bg-gradient-to-r from-purple-500 to-pink-500">
              useful.
            </span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <a
              className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform border rounded-lg bg-primary brightness-100 hover:brightness-125"
              href={DOWNLOAD_URL}
            >
              <span className="justify-center">Download Chrome Extension</span>
            </a>
            <a
              className="inline-flex items-center px-5 py-3 mt-2 font-medium transition duration-500 ease-in-out transform border rounded-lg bg-neutral-50 hover:bg-neutral-200"
              href="/Demo_Original.gif"
            >
              <span className="justify-center">Demo</span>
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            className=""
            alt="Screenshot of the extension"
            src="/Screenshot.png"
          ></img>
        </div>
      </div>
      {/* <section className="mx-auto">
        <div className="container px-5 mx-auto lg:px-24 ">
          <div className="flex flex-col w-full mb-4 text-left lg:text-center">
            <h1 className="mb-8 text-2xl Avenir font-semibold text-black">
              Trusted by top-tier product companies
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-16 mb-16 text-center lg:grid-cols-4">
            <div className="flex items-center justify-center">
              <img
                src="/images/Google-Logo.webp"
                alt="Google Logo"
                className="block object-contain h-16 greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/Shopify-Logo.svg"
                alt="Shopify Logo"
                className="block object-contain h-16 greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/Cloudflare-Logo.svg"
                alt="Cloudflare Logo"
                className="block object-contain h-16 greyC"
              ></img>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/PayPal-Logo.png"
                alt="Paypal Logo"
                className="block object-contain h-16 greyC"
              ></img>
            </div>
          </div>
        </div>
      </section> */}
      {/* <div className="grr max-w-7xl pt-20 mx-auto text-center">
        <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
          Less code, less effort.
        </h1>
        <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600 text-center">
          Minify your CSS with Tailwind's built in PostCSS support.
        </h1>
        <div className="container flex flex-col items-center justify-center mx-auto rounded-lg ">
          <img
            className="object-cover object-center w-3/4 mb-10 g327 border rounded-lg shadow-md"
            alt="Placeholder Image"
            src="/images/placeholder.png"
          ></img>
        </div>
      </div> */}
      {/* <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-600">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              placeholder="jack@example.com"
              name="email"
              type="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
            ></input>{' '}
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section> */}
    </section>
  )
}
