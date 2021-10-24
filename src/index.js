var timeout;
var productsInWishList = 0;

let addToWishListEvent = new CustomEvent('ProductAddedToWishList');
let removeFromWishListEvent = new CustomEvent('ProductRemovedFromWishList');
let closeDialogEvent = new CustomEvent('CloseDialog');
let myEvent = new CustomEvent('myEvent');

let messageDialog = document.querySelector('.dialog');
let closeDialogButton = document.querySelector('.dialog__cancel-btn');
let count = document.getElementById('wish-list-count');
let wishListButtons = document.querySelectorAll('button.product-item__wish-list-btn');

messageDialog.addEventListener('CloseDialog', closeMessageDialog);
closeDialogButton.addEventListener('ProductRemovedFromWishList', removeFromWishList);

closeDialogButton.addEventListener('click', function () {
  this.dispatchEvent(removeFromWishListEvent);
});

wishListButtons.forEach(button =>
  button.addEventListener('click', function () {
    this.dispatchEvent(addToWishListEvent);
  })
);

wishListButtons.forEach(button =>
  button.addEventListener('ProductAddedToWishList', addToWishList)
);

function addToWishList() {
  productsInWishList++;
  count.innerText = productsInWishList;
  console.log(count);

  messageDialog.style.display = 'flex';
  timeout = setTimeout(() => messageDialog.dispatchEvent(closeDialogEvent), 10000);
}

function closeMessageDialog() {
  messageDialog.style.display = 'none';
  clearTimeout(timeout);
}

function removeFromWishList() {
  productsInWishList--;
  count.innerText = productsInWishList;
  messageDialog.dispatchEvent(closeDialogEvent);
}

let closeTime = document.getElementById('hidden');
closeTime.onclick = closeDialog;

let close = document.getElementById('close');
close.onclick = closeDialog;

function closeDialog() {
  messageDialog.style.display = 'none';
}
