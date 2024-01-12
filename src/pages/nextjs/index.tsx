import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          </TabsContent>
          <TabsContent value="advanced" className="space-y-8">
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
          </TabsContent>
        </Tabs>
      </Form>
    </Layout>
  );
}
