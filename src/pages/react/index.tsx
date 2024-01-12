import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultValues, generate, schema } from "@/dockerizers/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Layout title="React" getFiles={() => generate(form.getValues())}>
      <Form {...form}>
        <Tabs defaultValue="basic" className="my-4">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-8">
            <FormSelect
              control={form.control}
              name="node_image"
              label="Node image"
              options={[
                { label: "node:14", value: "node:14" },
                { label: "node:14-alpine", value: "node:14-alpine" },
                { label: "node:16", value: "node:16" },
                { label: "node:16-alpine", value: "node:16-alpine" },
                { label: "node:18", value: "node:18" },
                { label: "node:18-alpine", value: "node:18-alpine" },
                { label: "node:20", value: "node:20" },
                { label: "node:20-alpine", value: "node:20-alpine" },
              ]}
            />
            <FormSelect
              control={form.control}
              name="nginx_image"
              label="Nginx image"
              options={[
                { label: "nginx:stable", value: "nginx:stable" },
                { label: "nginx:latest", value: "nginx:latest" },
              ]}
            />
            <FormInput
              control={form.control}
              name="port"
              label="Port"
              inputProps={{
                placeholder: "80",
                type: "number",
              }}
            />
          </TabsContent>
        </Tabs>
      </Form>
    </Layout>
  );
}
