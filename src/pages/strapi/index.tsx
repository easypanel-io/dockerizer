import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import { generate, schema } from "@/dockerizers/strapi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      node_version: "node:18",
      alpine: true,
      alpinePackages:
        "build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git",
      node_env: "production",
      build_packages: "node-gyp",
      production_packages: "vips-dev",
      user: "node",
      port: "1337",
    },
  });

  return (
    <Layout title="Strapi" getFiles={() => generate(form.getValues())}>
      <Form {...form}>
        <div className="space-y-8">
          <FormSelect
            control={form.control}
            name="node_version"
            label="Node version"
            options={[
              { label: "node:4", value: "node:4" },
              { label: "node:6", value: "node:6" },
              { label: "node:6", value: "node:6" },
              { label: "node:8", value: "node:8" },
              { label: "node:10", value: "node:10" },
              { label: "node:12", value: "node:12" },
              { label: "node:14", value: "node:14" },
              { label: "node:16", value: "node:16" },
              { label: "node:18", value: "node:18" },
              { label: "node:20", value: "node:20" },
            ]}
          />
          <FormSwitch
            control={form.control}
            name="alpine"
            label="Node alpine?"
            description="Check if you want the alpine version of node selected"
          />
          <FormInput
            control={form.control}
            name="alpinePackages"
            label="Alpine packages"
            inputProps={{
              placeholder: "...",
            }}
          />
          <FormInput
            control={form.control}
            name="node_env"
            label="Node Environment"
            inputProps={{
              placeholder: "production",
            }}
          />
          <FormInput
            control={form.control}
            name="build_packages"
            label="Global packages"
            inputProps={{
              placeholder: "node-gyp",
            }}
          />
          <FormInput
            control={form.control}
            name="production_packages"
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
