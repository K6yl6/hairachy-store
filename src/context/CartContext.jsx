import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

function getColorCode(product) {
  if (typeof product.color === "string") {
    return product.color;
  }

  return (
    product.color?.code ||
    product.colorCode ||
    "default"
  );
}

function createCartKey(product) {
  const productId = product.id;
  const colorCode = getColorCode(product);
  const length = product.length || "default";

  return `${productId}-${colorCode}-${length}`;
}

function loadStoredCart() {
  try {
    const storedCart =
      localStorage.getItem("hairachy-cart");

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.map((item) => ({
      ...item,

      cartKey: createCartKey(item),

      price: Number(item.price) || 0,

      quantity: Math.max(
        1,
        Number(item.quantity) || 1
      ),
    }));
  } catch (error) {
    console.error(
      "Could not load Hairachy cart:",
      error
    );

    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadStoredCart);

  useEffect(() => {
    localStorage.setItem(
      "hairachy-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(product) {
    const quantityToAdd = Math.max(
      1,
      Number(product.quantity) || 1
    );

    const cartKey = createCartKey(product);

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.cartKey === cartKey
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                ...product,
                cartKey,
                price: Number(product.price) || 0,
                quantity:
                  Number(item.quantity) +
                  quantityToAdd,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          cartKey,
          price: Number(product.price) || 0,
          quantity: quantityToAdd,
        },
      ];
    });
  }

  function removeFromCart(cartKey) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.cartKey !== cartKey
      )
    );
  }

  function updateQuantity(cartKey, amount) {
    const quantityChange =
      Number(amount) || 0;

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.cartKey !== cartKey) {
          return item;
        }

        return {
          ...item,

          quantity: Math.max(
            1,
            Number(item.quantity) +
              quantityChange
          ),
        };
      })
    );
  }

  function setItemQuantity(
    cartKey,
    quantity
  ) {
    const newQuantity = Math.max(
      1,
      Number(quantity) || 1
    );

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return sum + price * quantity;
      }, 0),
    [cart]
  );

  const itemCount = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          (Number(item.quantity) || 0),
        0
      ),
    [cart]
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    setItemQuantity,
    clearCart,
    subtotal,
    total: subtotal,
    itemCount,
  };

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
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}