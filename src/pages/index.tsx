import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  SiAngular,
  SiExpress,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxtdotjs,
  SiReact,
  SiStrapi,
  SiVuedotjs,
} from "react-icons/si";

const items = [
  { label: "Laravel", slug: "laravel", logo: SiLaravel, color: "#FF2D20" },
  { label: "Next.js", slug: "nextjs", logo: SiNextdotjs, color: undefined },
  { label: "Strapi", slug: "strapi", logo: SiStrapi, color: "#4945FF" },
  { label: "Vue.js", slug: "vuejs", logo: SiVuedotjs, color: "#4FC08D" },
  { label: "React", slug: "react", logo: SiReact, color: "#087ea4" },
  { label: "Angular", slug: "angular", logo: SiAngular, color: "#CB2B39" },
  { label: "Nuxt.js", slug: "nuxtjs", logo: SiNuxtdotjs, color: "#00DC82" },
  { label: "Node.js", slug: "nodejs", logo: SiNodedotjs, color: "#339933" },
  { label: "Express", slug: "express", logo: SiExpress, color: undefined },
];

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
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
                className="opacity-80 group-hover:opacity-100 transition-opacity"
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
