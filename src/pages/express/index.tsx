import { DockerizerLayout } from "@/components/Layout";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  nodeImageOptions,
  schema,
} from "@/dockerizers/nodejs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <DockerizerLayout title="Express.js" form={form} generate={generate}>
      <FormSelect
        control={form.control}
        name="nodeImage"
        label="Node image"
        options={nodeImageOptions}
      />
      <FormInput
        control={form.control}
        name="port"
        label="Port"
        inputProps={{
          type: "number",
          placeholder: "3000",
        }}
      />
    </DockerizerLayout>
  );
}
