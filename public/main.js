async function loadTodoItems() {
  const items = await (await fetch("/api/items")).json();
  console.log(items);
  const lis = items
    .map(
      ({ id, description, done }) => `<li id="item-${id}">
     <input onclick="itemChecked(${id})" id="item-checkbox-${id}" type="checkbox" ${
        done ? 'checked="checked"' : ""
      }"/>
     <label for="item-checkbox-${id}" class="${
        done ? "strikethrough" : ""
      }">${description}</label>
    </li>`
    )
    .join(" ");
  const ul = document.getElementById("list-root");
  ul.innerHTML = lis;
}

loadTodoItems();

async function itemChecked(id) {
  const checkbox = document.getElementById(`item-checkbox-${id}`);
  await fetch(`/api/item/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      done: checkbox.checked,
    }),
  });
  const label = document.querySelector(`label[for='item-checkbox-${id}']`);
  label.classList.toggle('strikethrough');
}
