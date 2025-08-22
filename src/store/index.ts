import { configureStore } from "@reduxjs/toolkit"
import exercisesReducer from "@/features/exercises/store/slice"

/**
 * Redux store configuration
 * Creates and configures the app's Redux store
 */

export const makeStore = () => {
  return configureStore({
    reducer: {
      exercises: exercisesReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]