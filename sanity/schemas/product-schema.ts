// product-schema.ts
import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "categories" }] }],
      validation: (rule) => rule.required(),
    },
    {
      name: "weights",
      title: "Weights",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Enter these values only: ['1', '1/2', '1/3', '1/4','0' for showing 'حسب الوزن']",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required(),
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (rule) => rule.required(),
    },
  ],
})
