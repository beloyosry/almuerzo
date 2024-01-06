// config/inventory.ts
import { Image } from "sanity"

export interface ProductData {
  weight?: string
  price?: number
  quantity?: number
}

export interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  weights: string[]
  price: number
  currency: string
  description: string
  product_data?: ProductData
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
}

export interface Category {
  _type: "categories"
  _id: string
  title: string
  images: Image
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface User {
  readonly _id: string
  readonly name: string
  readonly address: string
  readonly phone: string
  shippingStatus: string
  location: string
  shippingPrice: number
}

export interface OrderItem {
  readonly _key: string
  readonly _id: string
  readonly name: string
  readonly price: number
  readonly quantity: number
  readonly weight: string
}

export interface Order {
  readonly _id: string
  readonly _createdAt: string
  readonly _updatedAt: string
  readonly items: readonly OrderItem[]
  readonly user: User
  readonly readOnly: boolean
}

export interface Locations {
  _id: string
  location: string
  slug: string
  shippingPrice: number
}

export const inventory: InventoryProduct[] = [
  {
    id: "64da6006-a4bb-4555-af78-3467853eb75e",
    name: "Canvas Tote Bag",
    description: `Meet your new favorite carry-on. Our supersized tote is crafted in durable waxed cotton canvas that's rugged and durable, ideal for hauling all of your stuff. This size takes you to and from the farmer's market, the gym or a weekend getaway.`,
    price: 16800, // price in smallest currency unit (e.g. cent for USD)
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-1.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-2.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/canvas-tote-bag-3.jpg",
    ],
    weights: ["one-size"],
    categories: ["bags"],
    currency: "USD",
  },
  {
    id: "8d1a33a5-5650-4bd7-bb70-ba4670090700",
    name: "Khaki Tote Bag",
    description: `Meet your new favorite carry-on. Our supersized tote is crafted in durable waxed cotton canvas that's rugged and durable, ideal for hauling all of your stuff. This size takes you to and from the farmer's market, the gym or a weekend getaway.`,
    price: 14500,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-1.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-2.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-3.jpg",
    ],
    weights: ["one-size"],
    categories: ["bags"],
    currency: "USD",
  },
  {
    id: "e882fe48-253c-40fb-8155-51b47b063c1a",
    name: "Braided Leather Belt",
    description: `These handsome leather belts are guaranteed to pull together any outfit. They're made of vegetable-tanned Italian leather, which means they have natural highs and lows of color and will look even better over time.`,
    price: 4999,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/braided-leather-belt.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/braided-leather-belt.jpg",
    ],
    weights: ["s", "m", "l", "xl"],
    categories: ["belts"],
    currency: "USD",
  },
  {
    id: "6853a582-fc95-44af-9dac-dffbc694b47d",
    name: "Wool-Blend Suit Belt",
    description: `This handsome belt will pull together any outfit. The strong materials will take on your wear patterns and look even better over time.`,
    price: 5599,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/woolblend-suit-belt-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/woolblend-suit-belt-1.jpg",
    ],
    weights: ["s", "m", "l", "xl"],
    categories: ["belts"],
    currency: "USD",
  },
  {
    id: "b5980fb9-142b-4e0b-9683-daac07827e0a",
    name: "Wool Scarf",
    description: `Crafted in the finest English wool from the Abraham Moon mill (established in 1837), this scarf is an elegant and cozy addition to your winter wardrobe.`,
    price: 6199,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/wool-scarf-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/wool-scarf-1.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/wool-scarf-2.jpg",
    ],
    weights: ["one-size"],
    categories: ["scarves"],
    currency: "USD",
  },
  {
    id: "743b3855-6487-4d52-80fc-bcb8ca4fa74b",
    name: "Leather Gloves",
    description: `The smartest winter accessory. . . These 100 percent cashmere-lined gloves feature tech-friendly fingertips, so you can use your smartphone without getting frostbite.`,
    price: 9800,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/leather-gloves-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/leather-gloves-1.jpg",
    ],
    weights: ["s", "m", "l", "xl"],
    categories: ["gloves"],
    currency: "USD",
  },
  {
    id: "83ea928a-d834-4c6d-a588-4c93ec2de3c0",
    name: "Down Mittens",
    description: `Founded in Japan and now based in the U.S., Snow Peak has been making premium outdoor gear inspired by the mountainous region of Niigata, Japan, since 1958. Crafted in durable materials, these mittens are insulated with duckdown to keep your hands warm no matter through which polar vortex your day takes you.`,
    price: 13999,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/down-mittens-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/down-mittens-1.jpg",
    ],
    weights: ["s", "m", "l", "xl"],
    categories: ["gloves"],
    currency: "USD",
  },
  {
    id: "c5ef468d-d49e-4aa5-be5b-41f34af40b19",
    name: "Brooks Sunglasses",
    description: `These are timeless sunglasses that are designed in California and handmade in Japan by master craftsmen. The Brooks frames are made with a keyhole bridge, one of the many details the brand includes in their construction.`,
    price: 42000,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/brooks-sunglasses-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/brooks-sunglasses-1.jpg",
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/brooks-sunglasses-2.jpg",
    ],
    weights: ["one-size"],
    categories: ["sunglasses"],
    currency: "USD",
  },
  {
    id: "dd27c79d-97c3-47bb-9172-4ea74b096f6f",
    name: "Dock Sunglasses",
    description: `Our latest collection of handcrafted sunglasses features details like UV-protective lenses in shades specifically chosen to complement each frame, and all at a price that won't break the bank. We made these sunglasses with vintage-inspired acetate frames and a keyhole bridge.`,
    price: 5599,
    image:
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/dock-sunglasses-1.jpg",
    images: [
      "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/dock-sunglasses-1.jpg",
    ],
    weights: ["one-size"],
    categories: ["sunglasses"],
    currency: "USD",
  },
]
