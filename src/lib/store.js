import {writable} from 'svelte/store';

const storedLibrary = localStorage.getItem('library');

export const library = writable(storedLibrary?JSON.parse(storedLibrary):[
    {
        isbn: "9780061122415",
        title: "The Alchemist",
        authorName: "Paulo Coelho",
      }
]);

library.subscribe(value => {
    localStorage.setItem('library', JSON.stringify(value));
    }
);