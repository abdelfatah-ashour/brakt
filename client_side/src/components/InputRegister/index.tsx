import React from "react";

export default function InputRegister(props: {
  type: string;
  name: string;
  placeholder: string;
  id: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}): JSX.Element {
  const { type, name, placeholder, id, label, handleChange, value } = props;
  return (
    <div className="mb-3 w-100 p-2">
      <label htmlFor={id} className="form-label p-1 text-capitalize">
        {label}
      </label>
      <input
        type={type}
        className="form-control p-1 w-100"
        id={id}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
