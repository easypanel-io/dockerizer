import { Files } from "@/lib/types";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export async function downloadZip(files: Files) {
  const zip = new JSZip();

  Object.entries(files).map(([name, content]) => {
    zip.file(`dockerizer/${name}`, content);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });

  saveAs(zipBlob, "dockerizer.zip");
}
