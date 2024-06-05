class ShoppingItem {
  constructor(name) {
    this.name = name;
    this.isMarked = false;
    this.isDeleted = false;
  }

  toggleMarked() {
    this.isMarked = !this.isMarked;
  }

  markDeleted() {
    this.isDeleted = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.addBtn');
  const inputField = document.getElementById('myInput');
  const ulElement = document.getElementById('myUL');

  const items = [];

  addButton.addEventListener('click', () => newElement());

  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const index = Array.from(ulElement.children).indexOf(event.target);
      items[index].toggleMarked();
      event.target.classList.toggle('checked');
      updateCounts();
    }
  });

  function newElement() {
    const inputValue = inputField.value;
    if (inputValue === '') {
      alert("You must write something!");
      return;
    }

    const item = new ShoppingItem(inputValue);
    items.push(item);
    addItemToList(item);
    inputField.value = '';
    updateCounts();
  }

  function addItemToList(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item.name));

    const span = document.createElement('SPAN');
    const txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(span);

    ulElement.appendChild(li);

    span.addEventListener('click', () => {
      li.style.display = 'none';
      item.markDeleted();
      updateCounts();
    });
  }

  function updateCounts() {
    const totalItems = ulElement.getElementsByTagName('li').length;
    const markedItems = ulElement.getElementsByClassName('checked').length;
    const unmarkedItems = totalItems - markedItems;

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('marked-items').textContent = markedItems;
    document.getElementById('unmarked-items').textContent = unmarkedItems;
  }
});
