async function loadTodoItems() {
  const items = await (await fetch("/api/items")).json();
console.log(items);
  const lis = items.map(
    ({ id, description, done }) => `<li id="item-${id}">${description} - ${done ? 'Done' : 'Todo'}</li>`
  ).join(' ');
  const ul = document.getElementById("list-root");
  ul.innerHTML = lis;
}

loadTodoItems();