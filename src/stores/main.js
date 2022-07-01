import { writable } from "svelte/store";

export const mainStore = writable({
    baseUrl: "https://api.mengyuhan.me:5000",
});;