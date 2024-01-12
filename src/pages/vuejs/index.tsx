import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  defaultValues,
  generate,
  nginxImageOptions,
  nodeImageOptions,
  schema,
} from "@/dockerizers/vuejs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Layout title="VueJs" getFiles={() => generate(form.getValues())}>
      <Form {...form}>
        <Tabs defaultValue="basic" className="my-4">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-8">
            <FormSelect
              control={form.control}
              name="nodeImage"
              label="Node image"
              options={nodeImageOptions}
            />
            <FormSelect
              control={form.control}
              name="nginxImage"
              label="Nginx image"
              options={nginxImageOptions}
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
