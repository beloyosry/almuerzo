import { defineField, defineType } from "sanity"

import { OrderItem } from "@/config/inventory"

export const orders = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  readOnly: true,
  fields: [
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "price", type: "number", title: "Product Price" },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "weight", type: "string", title: "Weight" },
          ],
          readOnly: true,
        },
      ],
      readOnly: true,
    },
    {
      name: "user",
      title: "User Information",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "User Name" },
        { name: "address", type: "string", title: "User Address" },
        { name: "phone", type: "string", title: "Phone Number" },
      ],
      readOnly: true,
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "string",
    },
  ],
  preview: {
    select: {
      userName: "user.name",
      items: "items",
    },
    prepare: ({ userName, items }) => {
      const itemsTitle: string =
        (items as { name: string }[]).map((item) => item.name).join(", ") ||
        "No Items"
      return {
        title: `أوردر ${userName}  (${itemsTitle})`,
      }
    },
  },
})
