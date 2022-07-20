import { writable } from "svelte/store";

const gallery = writable({
    popOutDetail: {
        _id: '',
        url: '',
        type: '',
        createdAt: '',
        updatedAt: ''
    }
});

export default gallery;