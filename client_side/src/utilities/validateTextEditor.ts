import * as yup from "yup";

export function validateTextEditor(data: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}) {
  const schema = yup.object().shape({
    title: yup.string().min(16).required(),
    description: yup.string().min(55).required(),
    category: yup.string().min(3).required(),
    tags: yup.array().min(1).max(5).required(),
    content: yup.string().min(1024).required(),
  });

  return schema.validate(data);
}
