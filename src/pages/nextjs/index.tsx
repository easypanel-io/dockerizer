import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generate, schema } from "@/dockerizers/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      node_version: "node:18",
      alpine: true,
      telemetry: false,
      host: "localhost",
      port: "3000",
      filePermissions_user: "nextjs",
      filePermissions_group: "nodejs",
      alpinePackages: "libc6-compat",
    },
  });

  return (
    <Layout
      title="NextJs"
      getFiles={() => generate(form.getValues())}
      description="desc"
    >
      <Form {...form}>
        <Tabs defaultValue="basic" className="my-4">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-8">
            <FormSelect
              control={form.control}
              name="node_version"
              label="Node version"
              options={[
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
            <FormSwitch
              control={form.control}
              name="telemetry"
              label="Telemetry"
              description="Check if you want Telemetry"
            />
          </TabsContent>
          <TabsContent value="advanced" className="space-y-8">
            <FormInput
              control={form.control}
              name="filePermissions_user"
              label="File Permissions (User)"
              inputProps={{
                placeholder: "...",
              }}
            />
            <FormInput
              control={form.control}
              name="filePermissions_group"
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
          </TabsContent>
        </Tabs>
      </Form>
    </Layout>
  );
}
