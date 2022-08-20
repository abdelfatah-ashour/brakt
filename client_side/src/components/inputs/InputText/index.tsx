import React from "react";

type InputTypeProps = {
  className?: string;
  name?: string;
  type: "text" | "number" | "email" | "textarea" | "checkbox" | "file";
  id: string;
  placeholder?: string;
  checked?: boolean;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputText({
  className,
  name,
  type,
  id,
  placeholder,
  value,
  onChange,
}: InputTypeProps): JSX.Element {
  return (
    <input
      className={className}
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
