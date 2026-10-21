import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";
import { playSound } from "../utils/soundEffects";
import { addNotification } from "../utils/notifications";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "noiravenue_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!storedCart) {
        return [];
      }

      const parsedCart = JSON.parse(storedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Não foi possível salvar o carrinho:",
        error
      );
    }
  }, [cartItems]);

  /**
   * Adiciona um produto ao carrinho respeitando o estoque.
   */
  function addToCart(product, quantity = 1) {
    if (
      !product ||
      !Number.isFinite(Number(product.stock)) ||
      Number(product.stock) <= 0
    ) {
      toast.error("Produto indisponível.");
      return false;
    }

    const requestedQuantity = Math.max(
      1,
      Math.floor(Number(quantity) || 1)
    );

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existingItem
      ? Number(existingItem.quantity) || 0
      : 0;

    const availableQuantity =
      Number(product.stock) - currentQuantity;

    if (availableQuantity <= 0) {
      toast.info(
        `Você já adicionou todas as unidades disponíveis de ${product.name}.`
      );

      return false;
    }

    const addedQuantity = Math.min(
      requestedQuantity,
      availableQuantity
    );

    const reachedStockLimit =
      addedQuantity < requestedQuantity;

    let updatedItems;

    if (existingItem) {
      updatedItems = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: currentQuantity + addedQuantity,
              stock: Number(product.stock),
            }
          : item
      );
    } else {
      updatedItems = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: Number(product.stock),
          quantity: addedQuantity,
        },
      ];
    }

    setCartItems(updatedItems);

    if (reachedStockLimit) {
      toast.info(
        `${addedQuantity} ${
          addedQuantity === 1
            ? "unidade foi"
            : "unidades foram"
        } adicionada${
          addedQuantity === 1 ? "" : "s"
        }. Limite de estoque atingido.`
      );
    } else if (existingItem) {
      toast.success(
        `${product.name} teve a quantidade atualizada no carrinho.`
      );
    } else {
      toast.success(
        `${product.name} foi adicionado ao carrinho.`
      );
    }

    addNotification(
      existingItem
        ? `${product.name}: quantidade atualizada no carrinho.`
        : `${product.name} foi adicionado ao carrinho.`,
      "cart"
    );

    playSound("cart");

    return true;
  }

  /**
   * Aumenta uma unidade respeitando o estoque.
   */
  function increaseQuantity(productId) {
    const item = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) {
      return false;
    }

    if (item.quantity >= item.stock) {
      toast.info(
        `Você atingiu o limite de estoque de ${item.name}.`
      );

      return false;
    }

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );

    setCartItems(updatedItems);

    addNotification(
      `Quantidade de ${item.name} aumentada no carrinho.`,
      "cart"
    );

    return true;
  }

  /**
   * Diminui uma unidade sem remover o produto.
   */
  function decreaseQuantity(productId) {
    const item = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item || item.quantity <= 1) {
      return false;
    }

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          }
        : cartItem
    );

    setCartItems(updatedItems);

    addNotification(
      `Quantidade de ${item.name} reduzida no carrinho.`,
      "cart"
    );

    return true;
  }

  /**
   * Remove um produto do carrinho.
   */
  function removeFromCart(productId) {
    const item = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) {
      return false;
    }

    setCartItems(
      cartItems.filter(
        (cartItem) => cartItem.id !== productId
      )
    );

    toast.success(
      `${item.name} foi removido do carrinho.`
    );

    addNotification(
      `${item.name} foi removido do carrinho.`,
      "cart"
    );

    return true;
  }

  /**
   * Limpa todos os produtos do carrinho.
   */
  function clearCart() {
    if (cartItems.length === 0) {
      return false;
    }

    setCartItems([]);

    toast.success("Carrinho limpo com sucesso.");

    addNotification(
      "Todos os produtos foram removidos do carrinho.",
      "cart"
    );

    return true;
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      totalItems,
      subtotal,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, totalItems, subtotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser utilizado dentro de CartProvider."
    );
  }

  return context;
}