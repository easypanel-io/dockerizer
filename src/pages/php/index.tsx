import { DockerizerLayout } from "@/components/Layout";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  phpVersionOptions,
  schema,
  webServerOptions,
} from "@/dockerizers/php";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  form.watch();

  return (
    <DockerizerLayout title="PHP" form={form} generate={generate}>
      <div className="grid md:grid-cols-3 gap-6">
        <FormSelect
          control={form.control}
          name="phpVersion"
          label="PHP version"
          options={phpVersionOptions}
        />
        <FormSwitch control={form.control} name="alpine" label="Alpine" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <FormSelect
          control={form.control}
          name="webServer"
          label="Web Server"
          options={webServerOptions}
        />
        <FormInput
          control={form.control}
          name="documentRoot"
          label="Document Root"
          inputProps={{
            placeholder: "/",
          }}
        />
        <FormSwitch
          control={form.control}
          name="composerInstall"
          label="Composer Install"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <FormInput
          control={form.control}
          name="phpDateTimezone"
          label="PHP Date Timezone"
        />
        <FormInput
          control={form.control}
          name="phpDisplayErrors"
          label="PHP Display Errors"
        />
        <FormInput
          control={form.control}
          name="phpMemoryLimit"
          label="PHP Memory Limit"
        />
        <FormInput
          control={form.control}
          name="phpMaxExecutionTime"
          label="PHP Max Execution Time"
        />
        <FormInput
          control={form.control}
          name="phpPostMaxSize"
          label="PHP Post Max Size"
        />
        <FormInput
          control={form.control}
          name="phpUploadMaxFilesize"
          label="PHP Upload Max Filesize"
        />
      </div>
    </DockerizerLayout>
  );
}
