import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { downloadZip } from "@/lib/download";
import { detectLanguage } from "@/lib/highlight";
import { Files } from "@/lib/types";
import { CopyIcon, DownloadIcon, ShipIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`${inter.className}`}>
      <div className="fixed left-0 right-0 top-0 z-10 flex justify-between bg-slate-300 mb-10 p-4">
        <div className="">
          <Link href="/">Dockerizer</Link> by{" "}
          <Link href="https://easypanel.io/">Easypanel</Link>
        </div>
        <div className=""></div>
      </div>
      <div className="max-w-6xl px-4 mx-auto mt-28 mb-16">{children}</div>
      <Toaster />
    </main>
  );
}

export function DockerizerLayout({
  children,
  title,
  description,
  getFiles,
}: {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  getFiles: () => Files;
}) {
  const [previewFiles, setPreviewFiles] = useState<Files | null>(null);

  async function download() {
    const files = getFiles();
    await downloadZip(files);
  }

  function preview() {
    setPreviewFiles(getFiles());
  }

  useEffect(() => {
    if (previewFiles === null) {
      preview();
    }
  }, []);

  return (
    <Layout>
      <div className="md:flex justify-between">
        <div>
          <h1 className="text-3xl tracking-tight font-medium">
            Dockerize {title} Applications
          </h1>
          {description && <h2 className="text-xl">{description}</h2>}
        </div>
        <div className="space-x-2">
          <Button onClick={download} variant="secondary">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={preview}>
            <ShipIcon className="mr-2 h-4 w-4" />
            Dockerize
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-1 min-w-0">
          <div className="space-y-6">{children}</div>
          <div className="mt-6">
            <div className="space-x-2">
              <Button onClick={download} variant="secondary">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={preview}>
                <ShipIcon className="mr-2 h-4 w-4" />
                Dockerize
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 min-w-0">
          {previewFiles && Object.entries(previewFiles).length > 0 && (
            <div className="spacy-y-4">
              {Object.entries(previewFiles).map(([name, content], index) => (
                <div key={name} className="rounded overflow-hidden">
                  <div className="flex justify-between items-center bg-slate-200 p-2">
                    <div className="pl-2 text-sm font-medium">{name}</div>
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
                    style={docco}
                    className="text-sm !bg-slate-100 !p-4"
                  >
                    {content}
                  </SyntaxHighlighter>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
