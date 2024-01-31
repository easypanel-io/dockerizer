import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { downloadZip } from "@/lib/download";
import { detectLanguage } from "@/lib/highlight";
import { Files } from "@/lib/types";
import { debounce } from "lodash";
import {
  CopyIcon,
  DownloadIcon,
  GithubIcon,
  PlayIcon,
  ShipIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`${inter.className}`}>
      {/* <div className="fixed left-0 right-0 top-0 z-10 flex justify-between bg-gray-300 mb-10 p-4"> */}
      <div className="flex justify-between items-center p-2">
        <Link href="/" className="flex items-center font-semibold text-xl ml-2">
          <ShipIcon className="mr-2 h-7 w-7 text-green-500" />
          Dockerizer
        </Link>
        <div className="">
          <ModeToggle />
        </div>
      </div>
      <div className="max-w-6xl px-4 mx-auto mb-16">{children}</div>
      <Toaster />
    </main>
  );
}

export function DockerizerLayout({
  children,
  title,
  form,
  generate,
}: {
  children: ReactNode;
  title: ReactNode;
  form: UseFormReturn<any>;
  generate: (values: any) => Files;
}) {
  const getFiles = () => generate(form.getValues());
  const download = () => downloadZip(getFiles());
  const preview = () => setPreviewFiles(getFiles());
  const previewDebounced = useCallback(debounce(preview, 1000), []);

  const { theme } = useTheme();
  const [previewFiles, setPreviewFiles] = useState<Files | null>(null);
  useEffect(preview, []);
  form.watch(previewDebounced);

  return (
    <Form {...form}>
      <Layout>
        <div className="flex flex-col items-start my-24">
          <Link
            href="https://easypanel.io/"
            className="mb-6 text-green-500 border rounded-full py-1 px-3 border-green-300 dark:border-green-800 bg-green-500/5 hover:bg-green-500/15 text-sm font-medium leading-6 transition"
          >
            Provided by Easypanel
          </Link>
          <h1 className="text-5xl tracking-tight font-bold">
            Dockerize {title} Applications
          </h1>
          <h2 className="text-2xl text-zinc-600/90 dark:text-zinc-300/90 mt-2">
            The fastest way to dockerize your {title} app.
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
        <div className="space-y-14 scroll-mt-16" id="start">
          <div>
            <h2 className="text-2xl font-medium mb-6">Config</h2>
            <div className="space-y-6">{children}</div>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-6">Setup</h2>
            <ul className="text-slate-900 dark:text-slate-200 space-y-6">
              <li className="flex">
                {/*  */}
                <div className="inline-flex rounded-full w-6 h-6 items-center justify-center mr-2 text-green-500 border border-green-300 dark:border-green-800 bg-green-500/5 text-sm font-medium">
                  1
                </div>
                <div className="flex-1 space-y-2">
                  <div>Download and extract the files</div>
                  <Button onClick={download} size="sm">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </li>
              <li className="flex">
                <div className="inline-flex rounded-full w-6 h-6 items-center justify-center mr-2 text-green-500 border border-green-300 dark:border-green-800 bg-green-500/5 text-sm font-medium">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <div>Move the files into your codebase</div>
                  <div className="text-muted-foreground text-sm">
                    The extracted{" "}
                    <code className="border rounded p-1 bg-zinc-100 dark:bg-zinc-800">
                      dockerizer
                    </code>{" "}
                    folder should be in the root of your project.
                  </div>
                </div>
              </li>
              <li className="flex">
                <div className="inline-flex rounded-full w-6 h-6 items-center justify-center mr-2 text-green-500 border border-green-300 dark:border-green-800 bg-green-500/5 text-sm font-medium">
                  3
                </div>
                <div className="flex-1 space-y-2">
                  <div>Build the docker image</div>
                  <code className="inline-block text-muted-foreground text-sm border rounded-md py-2 px-3 bg-zinc-100 dark:bg-zinc-800">
                    docker build -t my-app -f .dockerizer/Dockerfile .
                  </code>
                </div>
              </li>
            </ul>
          </div>
          {previewFiles && Object.entries(previewFiles).length > 0 && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Files</h2>
              <div className="spacy-y-4">
                {Object.entries(previewFiles).map(([name, content], index) => (
                  <div key={name} className="rounded-md overflow-hidden">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="text-sm font-medium">{name}</div>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(content);
                          toast("Copied to clipboard");
                        }}
                      >
                        <CopyIcon className="mr-2 h-3.5 w-3.5" />
                        Copy
                      </Button>
                    </div>
                    <SyntaxHighlighter
                      language={detectLanguage(name)}
                      style={theme === "light" ? atomOneLight : atomOneDark}
                      className="text-sm  !p-4"
                    >
                      {content}
                    </SyntaxHighlighter>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </Form>
  );
}
