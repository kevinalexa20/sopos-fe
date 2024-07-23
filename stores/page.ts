import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => ({
    pageTitle: "Dashboard" as string, // Menambahkan tipe data string
  }),
  actions: {
    setPageTitle(title: string) {
      // Menambahkan tipe data string pada parameter
      this.pageTitle = title;
    },
  },
});
