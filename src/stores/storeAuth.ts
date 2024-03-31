import { defineStore } from "pinia";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../db/firebase";

interface User {
  id?: string;
  email?: string | null;
}

type Credentials = { email: string; password: string };

export const useStoreAuth = defineStore("storeAuth", {
  state: () => ({
    user: {} as User,
  }),
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User logged IN", user);

          this.user.id = user.uid;
          this.user.email = user.email;
        } else {
          console.log("User logged OUT", user);

          this.user = {};
        }
      });
    },
    async register(credentials: Credentials) {
      console.log("[authStore] register", credentials);
      const { email, password } = credentials;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("user :", userCredential.user);
      } catch (error) {
        throw error;
      }
    },

    async login(credentials: Credentials) {
      console.log("[authStore] login", credentials);
      const { email, password } = credentials;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("user :", userCredential.user);
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await signOut(auth);
      } catch (error) {
        throw error;
      }
    },
  },
});
