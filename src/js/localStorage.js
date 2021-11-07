function getLocalStorage(val, element) {
  return (element.value = localStorage.getItem(val) ?? '');
}

function setLocalStorage(itemName, element) {
  localStorage.setItem(itemName, element.value);
}

function getLocalStorageValue(val) {
  return localStorage.getItem(val) ?? '';
}

function setLocalStorageValue(itemName, value) {
  localStorage.setItem(itemName, value);
}

export {
  getLocalStorage,
  setLocalStorage,
  getLocalStorageValue,
  setLocalStorageValue,
};
