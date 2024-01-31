import { DockerizerLayout } from "@/components/Layout";
import { FormSelect } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  nodeImageOptions,
  schema,
} from "@/dockerizers/nestjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <DockerizerLayout title="Nest.js" form={form} generate={generate}>
      <div className="grid md:grid-cols-3 gap-6">
        <FormSelect
          control={form.control}
          name="nodeImage"
          label="Node image"
          options={nodeImageOptions}
        />
      </div>
    </DockerizerLayout>
  );
}
