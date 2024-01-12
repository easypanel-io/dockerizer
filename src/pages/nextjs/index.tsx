import { DockerizerLayout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  nodeImageOptions,
  schema,
} from "@/dockerizers/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <DockerizerLayout
      title="Next.js"
      getFiles={() => generate(form.getValues())}
    >
      <Form {...form}>
        <FormSelect
          control={form.control}
          name="nodeImage"
          label="Node image"
          options={nodeImageOptions}
        />
        <FormSwitch
          control={form.control}
          name="telemetry"
          label="Telemetry"
          description="Check if you want Telemetry"
        />
        <FormInput
          control={form.control}
          name="filePermissionsUser"
          label="File Permissions (User)"
          inputProps={{
            placeholder: "...",
          }}
        />
        <FormInput
          control={form.control}
          name="filePermissionsGroup"
          label="File Permissions (Group)"
          inputProps={{
            placeholder: "...",
          }}
        />
        <FormInput
          control={form.control}
          name="alpinePackages"
          label="Alpine packages"
          inputProps={{
            placeholder: "...",
          }}
        />
      </Form>
    </DockerizerLayout>
  );
}
