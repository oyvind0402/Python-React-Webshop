import React, { useReducer, useContext, createContext } from "react";

//Solution based on https://www.youtube.com/watch?v=prXxiedJvQA

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const currentBasket = [...state];
      console.log(currentBasket)
      let alreadyInBasket = false;
      for(let i = 0; i <currentBasket.length; i++){
        let product = currentBasket[i]
        if(product["id"] === action.item.id) {
          product["quantity"] += 1
          alreadyInBasket = true
          break
        }
      }

      if(!alreadyInBasket){
        action.item.quantity = 1;
        return [...state, action.item];
      } else{
        return currentBasket
      }

    case "REMOVE":
      const basket = [...state];
      basket.splice(action.index, 1);
      return basket;
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);