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
      <FormSelect
        control={form.control}
        name="phpVersion"
        label="PHP version"
        options={phpVersionOptions}
      />
      <FormSwitch control={form.control} name="alpine" label="Alpine" />
      <FormInput
        control={form.control}
        name="documentRoot"
        label="Document Root"
        inputProps={{
          placeholder: "/",
        }}
      />
      <FormSelect
        control={form.control}
        name="webServer"
        label="Web Server"
        options={webServerOptions}
      />
      <FormSwitch
        control={form.control}
        name="runComposerInstall"
        label="Run composer install"
      />
      <FormInput
        control={form.control}
        name="phpDateTimezone"
        label="PHP Date Timezone"
        inputProps={{
          placeholder: "",
        }}
      />
      <FormInput
        control={form.control}
        name="phpDisplayErrors"
        label="PHP Display Errors"
        inputProps={{
          placeholder: "",
        }}
      />
      <FormInput
        control={form.control}
        name="phpMemoryLimit"
        label="PHP Memory Limit"
        inputProps={{
          placeholder: "",
        }}
      />
      <FormInput
        control={form.control}
        name="phpMaxExecutionTime"
        label="PHP Max Execution Time"
        inputProps={{
          placeholder: "",
        }}
      />
      <FormInput
        control={form.control}
        name="phpPostMaxSize"
        label="PHP Post Max Size"
        inputProps={{
          placeholder: "",
        }}
      />
      <FormInput
        control={form.control}
        name="phpUploadMaxFilesize"
        label="PHP Upload Max Filesize"
        inputProps={{
          placeholder: "",
        }}
      />
    </DockerizerLayout>
  );
}
