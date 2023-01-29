function addBook(arr, book){
    arr.push(book);
    return arr;
}
function editBook(arr,index, book){
    arr[index] = book;
    return arr;
}
function deleteBook(arr, index){
     arr.splice(index, 1);
     return arr;
}
export {addBook, editBook, deleteBook};