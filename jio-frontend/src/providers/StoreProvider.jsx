"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}


/*useRef() is used to create a persistent reference (storeRef).
The if condition checks if storeRef.current is undefined (which happens only on the first render).
If storeRef.current is null or undefined, it calls makeStore() to create a new Redux store and assigns it to storeRef.current.
The Provider component wraps the children and provides the Redux store (storeRef.current) to the component tree.*/