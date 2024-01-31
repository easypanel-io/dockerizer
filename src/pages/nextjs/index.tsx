import { DockerizerLayout } from "@/components/Layout";
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
    <DockerizerLayout title="Next.js" form={form} generate={generate}>
      <div className="grid md:grid-cols-3 gap-6">
        <FormSelect
          control={form.control}
          name="nodeImage"
          label="Node image"
          options={nodeImageOptions}
        />
        <FormInput
          control={form.control}
          name="alpinePackages"
          label="Alpine packages"
        />
        <FormSwitch control={form.control} name="telemetry" label="Telemetry" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <FormInput control={form.control} name="user" label="User" />
        <FormInput control={form.control} name="group" label="Group" />
      </div>
    </DockerizerLayout>
  );
}
