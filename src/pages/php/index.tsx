import { DockerizerLayout } from "@/components/Layout";
import { FormInput, FormSelect, FormSwitch } from "@/components/ui/form-fields";
import {
  defaultValues,
  generate,
  phpImageOptions,
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
        name="phpImage"
        label="Node image"
        options={phpImageOptions}
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
        name="phpUnixSocket"
        label="PHP Unix Socket"
      />
      {form.getValues().phpUnixSocket && (
        <FormInput
          control={form.control}
          name="phpUnixSocketValue"
          label="PHP Unix Socket Value"
          inputProps={{
            placeholder: "/var/run/php-fpm.sock",
          }}
        />
      )}
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
