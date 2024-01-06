// cart-provider.tsx

"use client"
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { SanityProduct } from '@/config/inventory';

interface CartContextProps {
  /** 
  *This is containing the cart items as an array of SanityProduct objects.
  * @type {SanityProduct[]}
  * @default []
  * @example
  * const [cartItems, setCartItems] = useState<SanityProduct[]>([]);
  */
  cartItems: SanityProduct[];

  /**
   * This function is used to add an item to the cart.
   * @param product - The product to be added to the cart.
   * @returns void - This function does not return anything.
   * @throws Throws an error if the product is already in the cart.
   * @throws Throws an error if the product is not found.
   * @throws Throws an error if the product is out of stock.
   */
  addItemToCart: (product: SanityProduct) => void;

  /**
   * This function is used to remove an item from the cart.
   * @param product - The product to be removed from the cart.
   */
  removeFromCart: (product: SanityProduct) => void;

  /**
   * This function is used to update the quantity of an item in the cart.
   * @param productId - The ID of the product to update.
   * @param size - The size of the product to update.
   * @param newQuantity - The new quantity of the product.
   */
  updateQuantity: (productId: string, size: string, newQuantity: number) => void;

  /**
   * This function is used to clear the cart.
   * @returns void - This function does not return anything.
   */
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function MyCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<SanityProduct[]>([]);

  useEffect(() => {
    const sessionStorageItems = JSON.parse(sessionStorage.getItem('products') || '[]');
    setCartItems(sessionStorageItems);
  }, []);

  const addItemToCart = (product: SanityProduct) => {
    const existingItemIndex = cartItems.findIndex(
      (p) => p._id === product._id && p.product_data?.size === product.product_data?.size
    );

    if (existingItemIndex !== -1) {
      // Item with the same ID and size exists, update its quantity
      const updatedItems = cartItems.map((p, index) =>
        index === existingItemIndex
          ? { ...p, product_data: { ...p.product_data, quantity: p.product_data?.quantity! + product.product_data?.quantity! } }
          : p
      );

      sessionStorage.setItem('products', JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    } else {
      // Item does not exist, add it to the cart
      const updatedItems = [...cartItems, product];
      sessionStorage.setItem('products', JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    }
  };

  const removeFromCart = (product: SanityProduct) => {
    console.log('Before Removal:', cartItems);

    const updatedItems = cartItems.filter(
      (p) => !(p._id === product._id && p.product_data?.size === product.product_data?.size)
    );

    console.log('Removing item:', product._id, product.product_data?.size);
    console.log('Updated items:', updatedItems);

    sessionStorage.setItem('products', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem('products');
  }


  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    const updatedItems = cartItems.map((p) =>
      p._id === productId && p.product_data?.size === size
        ? { ...p, product_data: { ...p.product_data, quantity: newQuantity } }
        : p
    );
    sessionStorage.setItem('products', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };


  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function UseCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
