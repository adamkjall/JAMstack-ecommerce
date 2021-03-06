import LogoIcon from "../../../public/icons/fox-icon.svg";

export default function Footer() {
  return (
    <footer id="footer" className="bg-black">
      {/* <!-- start container --> */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2">
          <div className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 1 Content --> */}
            <LogoIcon width="50" />
          </div>

          <div className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 2 Content --> */}

            <h3 className="text-white">Important</h3>
            <ul className="nav navbar-nav">
              <li id="navi-2" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-1">
                  Page 1{" "}
                </a>
              </li>
              <li id="navi-1" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-2">
                  Page 2
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 3 Content --> */}
            <h3 className="text-white">Info</h3>
            <ul className="">
              <li id="navi-2" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-1">
                  Page 1{" "}
                </a>
              </li>
              <li id="navi-1" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-2">
                  Page 2
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 4 Content --> */}

            <h3 className="text-white">Products</h3>
            <ul className="">
              <li id="navi-2" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-1">
                  Page 1{" "}
                </a>
              </li>
              <li id="navi-1" className="leading-7 text-sm">
                <a className="text-white underline text-small" href="/page-2">
                  Page 2
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Start footer bottom --> */}

        <div
          className="pt-4 px-4 md:flex md:items-center md:justify-center "
          style={{ borderTop: "1px solid white" }}
        >
          <ul className="flex justify-between">
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="text-white underline text-small" href="/disclaimer">
                Disclaimer
              </a>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="text-white underline text-small" href="/cookie">
                Cookie policy
              </a>
            </li>
            <li
              className="md:mx-2 md:inline leading-7 text-sm"
              id="footer-navi-2"
            >
              <a className="text-white underline text-small" href="/privacy">
                Privacy
              </a>
            </li>
          </ul>
        </div>

        {/* <!-- end container --> */}
      </div>
    </footer>
  );
}
