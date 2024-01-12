import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const items = [
  { label: "Laravel", slug: "laravel" },
  { label: "Next.js", slug: "nextjs" },
  { label: "Strapi", slug: "strapi" },
  { label: "Vue.js", slug: "vuejs" },
  { label: "React", slug: "react" },
  { label: "Angular", slug: "angular" },
];

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Button
            asChild
            key={index}
            variant="secondary"
            className="h-24 text-md rounded-lg"
          >
            <Link href={`/${item.slug}`}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </Layout>
  );
}
