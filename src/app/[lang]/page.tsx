import website from "@/websiteInfo.json"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1 className="mb-6 text-3xl font-black md:text-4xl text-bold">
        {website.pages[0].title}
      </h1>
      <section className="w-full">
        <ul className="flex justify-end gap-2 mb-6 text-primary/80">
          {
            website.pages.map((page) =>
            (<li key={page.href}>
              <Link href={page.href} className="hover:underline">
                {page.navbar}
              </Link>
            </li>)
            )
          }
        </ul>
      </section>
      <section>
        <p className="text-primary">
          Hey, I&apos;m a Software Engineer at Domu. I get to play with cool stuff everyday.
          I&apos;m 19, I learned to code by my own watching YouTube videos. I love to build products while I learn. I think that impossible just takes longer.
          {/* TODO: use MDX here */}
        </p>
      </section>
    </main>
  )
}