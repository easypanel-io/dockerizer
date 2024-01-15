import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { downloadZip } from "@/lib/download";
import { detectLanguage } from "@/lib/highlight";
import { Files } from "@/lib/types";
import { debounce } from "lodash";
import { CopyIcon, DownloadIcon, ShipIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
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
  description,
  form,
  generate,
}: {
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
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
        <div className="flex flex-col items-center my-24">
          <div className="mb-6 text-green-500 border rounded-full py-1 px-3 border-green-500 text-sm leading-6">
            <Link href="https://easypanel.io/" className="">
              Provided by Easypanel
            </Link>
          </div>
          <h1 className="text-4xl tracking-tight font-semibold">
            Dockerize {title} Applications
          </h1>
          {description && <h2 className="text-xl">{description}</h2>}
        </div>
        <div className="space-y-8">
          <div className="space-y-6">{children}</div>
          <div>
            <h2>Setup & Build</h2>
            <Button onClick={download} variant="secondary">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          {previewFiles && Object.entries(previewFiles).length > 0 && (
            <div className="spacy-y-4">
              {Object.entries(previewFiles).map(([name, content], index) => (
                <div key={name} className="rounded-md overflow-hidden">
                  <div className="flex justify-between items-center py-2 border-b">
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
                    style={theme === "light" ? docco : dark}
                    className="text-sm  !p-4"
                  >
                    {content}
                  </SyntaxHighlighter>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </Form>
  );
}
