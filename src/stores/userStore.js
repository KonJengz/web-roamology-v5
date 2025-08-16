import { create } from "zustand";
import { persist } from "zustand/middleware";
import authApi from "../api/auth";

const useUserStore = create(
  persist(
    (set, get) => ({
      // --- STATE ---
      accessToken: "",
      user: null,
      isLoading: true,

      // --- ACTIONS ---
      login: async (input) => {
        try {
          const response = await authApi.login(input);
          console.log("response", response);
          const { accessToken } = response.data;
          set((state) => ({ ...state, accessToken }));
          await get().fetchUser();
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      register: async (input) => {
        try {
          await authApi.register(input);
        } catch (error) {
          console.error("Register failed:", error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error(
            "Server logout failed, proceeding with client logout:",
            error
          );
        }

        set((state) => ({ ...state, accessToken: "", user: null }));
      },

      fetchUser: async () => {
        try {
          const response = await authApi.getMe();

          set((state) => ({
            ...state,
            user: response.data.user,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Fetch user failed:", error);

          set((state) => ({
            ...state,
            accessToken: "",
            user: null,
            isLoading: false,
          }));
        }
      },
    }),
    {
      name: "auth-storage",
      // persist จะบันทึกแค่ accessToken ลง localStorage เท่านั้น
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);

export default useUserStore;
