import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "@features/authorization/models/index";
import { UserReducer } from "@features/user/models/index";
import { SettingsReducer } from "@features/settings/models/index";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistReducer = {
  key: "auth",
  storage,
};

const userPersistReducer = {
  key: "user",
  storage,
};

const settingsPersistReducer = {
  key: "user",
  storage,
};

const rootReducer = {
  authState: persistReducer(authPersistReducer, AuthReducer),
  userState: persistReducer(userPersistReducer, UserReducer),
  settingsState: persistReducer(settingsPersistReducer, SettingsReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
