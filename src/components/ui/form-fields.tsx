import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ReactNode } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  inputProps,
  ...controllerProps
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: ReactNode;
  description?: ReactNode;
  inputProps?: InputProps;
}) => {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...inputProps} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  ...controllerProps
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: ReactNode;
  description?: ReactNode;
}) => {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  ...controllerProps
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: ReactNode;
  description?: ReactNode;
}) => {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="block pt-1.5">
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  options,
  ...controllerProps
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  label: ReactNode;
  description?: ReactNode;
  options: { label: string; value: string }[] | string[];
}) => {
  return (
    <>
      <FormField
        {...controllerProps}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option, i) =>
                  typeof option === "string" ? (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ) : (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
