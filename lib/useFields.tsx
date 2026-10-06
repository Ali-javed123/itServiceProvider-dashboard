import { useField } from "formik";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FormikInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const FormikInput = ({
  name,
  label,
  type = "text",
  placeholder,
}: FormikInputProps) => {
  const [field, meta] = useField(name);

  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {label}
      </FieldLabel>

      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
      />

      {meta.touched && meta.error && (
        <FieldError>
          {meta.error}
        </FieldError>
      )}
    </Field>
  );
};

export default FormikInput;