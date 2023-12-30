import { defineField, defineType } from "sanity"

export const categories = defineType({
  name: "categories",
  title: "Categories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "images",
      title: "Images",
      type: "image",
      options: {
        hotspot: true,
      }
    },
  ],
})
