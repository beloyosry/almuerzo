import { type SchemaTypeDefinition } from "sanity"

import { categories } from "../sanity/schemas/categories-schema"
import { orders } from "../sanity/schemas/orders-schema"
import { product } from "../sanity/schemas/product-schema"
import { shipping } from "../sanity/schemas/shipping-schema"
import { stock } from "../sanity/schemas/stock-schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categories, orders, shipping, stock],
}
