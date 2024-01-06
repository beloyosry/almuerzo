import { categories } from "../sanity/schemas/categories-schema"
import { product } from "../sanity/schemas/product-schema"
import { orders } from "../sanity/schemas/orders-schema"
import { shipping } from "../sanity/schemas/shipping-schema"
import { type SchemaTypeDefinition } from "sanity"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categories,orders,shipping],
}
