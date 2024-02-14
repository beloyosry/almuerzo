import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-20 lg:px-8">
        <nav
          className="-mb-6 columns-2 gap-3 sm:flex sm:justify-center"
          aria-label="Footer"
        >
          {siteConfig.footer.map((item) => (
            <div key={item.name} className="pb-6 text-center">
              <Link href={item.href} className="text-sm leading-6">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <Link
          href="https://beloyosry.github.io/Belal-Portfolio/"
          className="mt-10 block text-center text-xs leading-5"
          target={"_blank"}
        >
          &copy; {new Date().getFullYear()} By Belal Yosry . All rights
          reserved.
        </Link>
      </div>
    </footer>
  )
}
