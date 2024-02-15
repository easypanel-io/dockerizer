import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { GithubIcon, PlayIcon } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import {
  SiAngular,
  SiExpress,
  SiLaravel,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPhp,
  SiReact,
  SiStrapi,
  SiVuedotjs,
} from "react-icons/si";

// Find icons and colors here: https://simpleicons.org/
const items = [
  { label: "Angular", slug: "angular", logo: SiAngular, color: "#CB2B39" },
  { label: "Express", slug: "express", logo: SiExpress, color: undefined },
  { label: "Laravel", slug: "laravel", logo: SiLaravel, color: "#FF2D20" },
  { label: "Nest.js", slug: "nestjs", logo: SiNestjs, color: "#E0234E" },
  { label: "Next.js", slug: "nextjs", logo: SiNextdotjs, color: undefined },
  { label: "Node.js", slug: "nodejs", logo: SiNodedotjs, color: "#339933" },
  { label: "Nuxt.js", slug: "nuxtjs", logo: SiNuxtdotjs, color: "#00DC82" },
  { label: "PHP", slug: "php", logo: SiPhp, color: "#777BB4" },
  { label: "React", slug: "react", logo: SiReact, color: "#087ea4" },
  { label: "Strapi", slug: "strapi", logo: SiStrapi, color: "#4945FF" },
  { label: "Vue.js", slug: "vuejs", logo: SiVuedotjs, color: "#4FC08D" },
];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Dockerizer by Easypanel</title>
        <meta
          name="description"
          content="The fastest way to dockerize your apps."
        />
      </Head>
      <div className="flex flex-col items-center text-center my-24">
        <Link
          href="https://easypanel.io/"
          className="mb-6 text-green-500 border rounded-full py-1 px-3 border-green-300 dark:border-green-800 bg-green-500/5 hover:bg-green-500/15 text-sm font-medium leading-6 transition"
        >
          Provided by Easypanel
        </Link>
        <h1 className="text-5xl tracking-tight font-bold">
          Dockerize your Applications
        </h1>
        <h2 className="text-2xl text-zinc-600/90 dark:text-zinc-300/90 mt-2">
          The fastest way to dockerize your apps.
        </h2>
        <div className="flex space-x-2 mt-10">
          <Button
            variant="secondary"
            size="lg"
            onClick={(e) => {
              document
                .getElementById("start")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <PlayIcon className="mr-2 h-5 w-5" />
            Get Started
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link
              href="https://github.com/easypanel-io/dockerizer"
              target="_blank"
            >
              <GithubIcon className="mr-2 h-5 w-5" />
              Github
            </Link>
          </Button>
        </div>
      </div>
      <div
        id="start"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16"
      >
        {items.map((item, index) => (
          <Button
            asChild
            key={index}
            variant="secondary"
            className="h-36 text-md rounded-lg"
          >
            <Link href={`/${item.slug}`} className="group flex flex-col gap-4">
              <div
                style={{ color: item.color }}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
              >
                <item.logo size={40} height={40} />
              </div>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </Layout>
  );
}
