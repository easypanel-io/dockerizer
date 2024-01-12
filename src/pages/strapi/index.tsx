import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  nodeVersionOptions,
  schema,
} from "@/dockerizers/strapi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Layout title="Strapi" getFiles={() => generate(form.getValues())}>
      <Form {...form}>
        <div className="space-y-8">
          <FormSelect
            control={form.control}
            name="nodeVersion"
            label="Node version"
            options={nodeVersionOptions}
          />
          <FormInput
            control={form.control}
            name="buildStagePackages"
            label="Build stage packages"
            inputProps={{
              placeholder: defaultValues.buildStagePackages,
            }}
          />
          <FormInput
            control={form.control}
            name="productionStagePackages"
            label="Production packages"
            inputProps={{
              placeholder: "vips-dev",
            }}
          />
          <FormInput
            control={form.control}
            name="user"
            label="User"
            inputProps={{
              placeholder: "node",
            }}
          />
          <FormInput
            control={form.control}
            name="port"
            label="Port"
            inputProps={{
              placeholder: "1337",
            }}
          />
        </div>
      </Form>
    </Layout>
  );
}
