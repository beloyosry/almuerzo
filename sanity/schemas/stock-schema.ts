// stock-schema.ts
import { defineType } from "sanity";


export const stock = defineType({
  name: "stock",
  title: "Stock",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "availableStock",
      title: "Available Stock",
      type: "number",
      validation: (rule) => rule.required(),
    },
  ],
});


