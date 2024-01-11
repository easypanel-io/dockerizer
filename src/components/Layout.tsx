import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { downloadZip } from "@/lib/download";
import { detectLanguage } from "@/lib/highlight";
import { Files } from "@/lib/types";
import { ReactNode, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toast } from "sonner";

export function Layout({
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
    <div className="p-20 ">
      <h1 className="text-2xl">{title}</h1>
      {description && <h2 className="text-2xl">{description}</h2>}

      <div className="grid grid-cols-3 gap-8 mt-4">
        <div className="col-span-1">
          {children}
          <div className="space-y-4">
            <Button onClick={preview}>Preview</Button>
            <Button onClick={download}>Download</Button>
          </div>
        </div>

        <div className="col-span-2">
          {previewFiles && Object.entries(previewFiles).length > 0 && (
            <div className="p-2 bg-gray-400 rounded-sm">
              <h1>Preview files</h1>
              <Tabs defaultValue="0" className="w-full mt-4">
                <TabsList>
                  {Object.entries(previewFiles).map(
                    ([name, content], index) => (
                      <TabsTrigger key={name} value={String(index)}>
                        {name}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
                {Object.entries(previewFiles).map(([name, content], index) => (
                  <TabsContent key={name} value={String(index)}>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(content);
                        toast("Copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                    <SyntaxHighlighter
                      language={detectLanguage(name)}
                      style={docco}
                      className="max-h-[50dvh] overflow-auto"
                    >
                      {content}
                    </SyntaxHighlighter>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
