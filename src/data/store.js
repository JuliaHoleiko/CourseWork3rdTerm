import { configureStore } from "@reduxjs/toolkit"
import itemSlice from "./reducer"

export const store = configureStore({
    reducer: {
        items: itemSlice,
    }
})