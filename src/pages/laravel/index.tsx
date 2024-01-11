import { Layout } from "@/components/Layout";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components/ui/form-fields";
import { generate, schema } from "@/dockerizers/laravel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      php_version: "7.4-apache",
      packages:
        "libzip-dev unzip libpng-dev libjpeg-dev libonig-dev libxml2-dev curl",
      php_extensions: "pdo_mysql zip exif pcntl bcmath gd",
      port: 80,
    },
  });

  return (
    <Layout title="Laravel" getFiles={() => generate(form.getValues())}>
      <Form {...form}>
        <div className="space-y-8">
          <FormSelect
            control={form.control}
            name="php_version"
            label="PHP version"
            options={[
              { label: "5.3-apache", value: "5.3-apache" },
              { label: "7.4-apache", value: "7.4-apache" },
              { label: "8.3-apache", value: "8.3-apache" },
            ]}
          />
          <FormInput
            control={form.control}
            name="packages"
            label="Packages"
            description="packages that will be installed"
            inputProps={{
              placeholder: "unzip curl...",
            }}
          />
          <FormInput
            control={form.control}
            name="php_extensions"
            label="PHP Extensions"
            inputProps={{
              placeholder: "pdo_mysql zip exif...",
            }}
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
        </div>
      </Form>
    </Layout>
  );
}
