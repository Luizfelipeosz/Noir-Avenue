import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

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
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /**
   * Adiciona um produto ao carrinho.
   *
   * Se o produto já existir, soma a quantidade respeitando
   * o estoque disponível.
   */
  function addToCart(product, quantity = 1) {
    if (!product || product.stock <= 0) {
      toast.error("Produto indisponível.");
      return false;
    }

    const requestedQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    let addedQuantity = requestedQuantity;
    let reachedStockLimit = false;
    let productAlreadyInCart = false;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        productAlreadyInCart = true;

        const availableQuantity =
          product.stock - existingItem.quantity;

        if (availableQuantity <= 0) {
          reachedStockLimit = true;
          addedQuantity = 0;

          return currentItems;
        }

        addedQuantity = Math.min(
          requestedQuantity,
          availableQuantity
        );

        reachedStockLimit =
          addedQuantity < requestedQuantity;

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + addedQuantity,
                stock: product.stock,
              }
            : item
        );
      }

      addedQuantity = Math.min(
        requestedQuantity,
        product.stock
      );

      reachedStockLimit =
        addedQuantity < requestedQuantity;

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: product.stock,
          quantity: addedQuantity,
        },
      ];
    });

    if (reachedStockLimit && addedQuantity === 0) {
      toast.info(
        `Você já adicionou todas as unidades disponíveis de ${product.name}.`
      );

      return false;
    }

    if (reachedStockLimit) {
      toast.info(
        `${addedQuantity} ${
          addedQuantity === 1 ? "unidade foi" : "unidades foram"
        } adicionada${
          addedQuantity === 1 ? "" : "s"
        }. Limite de estoque atingido.`
      );

      return true;
    }

    if (productAlreadyInCart) {
      toast.success(
        `${product.name} teve a quantidade atualizada no carrinho.`
      );
    } else {
      toast.success(
        `${product.name} foi adicionado ao carrinho.`
      );
    }

    return true;
  }

  /**
   * Aumenta uma unidade respeitando o estoque.
   */
  function increaseQuantity(productId) {
    let reachedStockLimit = false;
    let productName = "";

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        productName = item.name;

        if (item.quantity >= item.stock) {
          reachedStockLimit = true;

          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );

    if (reachedStockLimit) {
      toast.info(
        `Você atingiu o limite de estoque de ${productName}.`
      );
    }
  }

  /**
   * Diminui uma unidade.
   *
   * O produto nunca é removido através do botão "-".
   * Quando chegar a 1 unidade, o botão deve ficar desabilitado.
   */
  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity <= 1) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
    );
  }

  /**
   * Remove completamente um produto.
   */
  function removeFromCart(productId) {
    let removedProductName = "";

    setCartItems((currentItems) => {
      const itemToRemove = currentItems.find(
        (item) => item.id === productId
      );

      if (itemToRemove) {
        removedProductName = itemToRemove.name;
      }

      return currentItems.filter(
        (item) => item.id !== productId
      );
    });

    if (removedProductName) {
      toast.success(
        `${removedProductName} foi removido do carrinho.`
      );
    }
  }

  /**
   * Remove todos os produtos depois de confirmação.
   */
  function clearCart() {
    if (cartItems.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Tem certeza que deseja limpar o carrinho?\n\nTodos os produtos serão removidos."
    );

    if (!confirmed) {
      return;
    }

    setCartItems([]);

    toast.success("Carrinho limpo com sucesso.");
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

