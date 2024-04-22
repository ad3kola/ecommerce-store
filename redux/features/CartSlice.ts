import { useToast } from "@/components/ui/use-toast";
import { CartProductProps, ProductProps } from "@/lib/typings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitialStateProps = {
  value: {
    cartproducts: CartProductProps[];
  };
};

// const { toast } = useToast();

const initialState = {
  value: {
    cartproducts: [],
  },
} as InitialStateProps;

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ProductProps>) => {
      const itemId = state.value.cartproducts.findIndex(
        (item) => item.id == action.payload.id
      );
      if (itemId >= 0) {
        state.value.cartproducts[itemId].itemQty += 1;
        // toast({
        //   title: "Product Quantity Increased",
        //   description: `${state.value.cartproducts[itemId].title}`,
        // });
      } else {
        const temp = { ...action.payload, itemQty: 1 };
        state.value.cartproducts.push(temp);
        // toast({
        //   title: "Product Added to Cart",
        //   description: `${state.value.cartproducts[itemId].title}`,
        // });
      }
    },
    removeProductFromCart: (state, action: PayloadAction<CartProductProps>) => {
      const itemId = state.value.cartproducts.findIndex(
        (item) => item.id == action.payload.id
      );
      const filteredCart = state.value.cartproducts.filter(
        (item) => item.id !== action.payload.id
      );
      state.value.cartproducts = filteredCart;
      // toast({
      //     title: "Product Removed from cart",
      //     description: `${state.value.cartproducts[itemId].title}`,
      //   });
    },
    increaseProductQTY: (state, action: PayloadAction<CartProductProps>) => {
      const itemId = state.value.cartproducts.findIndex(
        (item) => item.id == action.payload.id
      );
      state.value.cartproducts[itemId].itemQty += 1;
      // toast({
      //     title: "Product Quantity Increased",
      //     description: `${state.value.cartproducts[itemId].title}`,
      //   });
    },
    decreaseProductQTY: (state, action: PayloadAction<CartProductProps>) => {
      const itemId = state.value.cartproducts.findIndex(
        (item) => item.id == action.payload.id
      );
      state.value.cartproducts[itemId].itemQty -= 1;
    },
    clearCart: (state) => {
      state.value.cartproducts = []
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseProductQTY,
  decreaseProductQTY,
  clearCart,
} = cartslice.actions;
export default cartslice.reducer;
