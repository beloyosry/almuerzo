// Shipping Schema
import {defineType } from "sanity"

export const shipping = defineType({
  name: 'shipping',
  title: 'Shipping',
  type: 'document',
  fields: [
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "location",
      },
    },
    {
      name: 'shippingPrice',
      title: 'Shipping Price',
      type: 'number',
    },
  ],
})
