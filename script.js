/* Global Declaration */
const itemCount = localStorage.length;

/* Add todo */
addTodo = () => {
  const title = document.getElementById("todo-title");
  const desc = document.getElementById("todo-desc");
  if (title.value == "" || desc.value == "") {
    const response = document.getElementById("response");
    response.style.display = "block";
    response.style.color = "red";
    response.innerHTML = "Please fill out all the fields!";
    setTimeout(() => {
      response.innerHTML = "";
      response.style.display = "none";
    }, 2000);
  } else {
    localStorage.setItem(title.value, desc.value);
    location.reload();
  }
};

/* Get items from localStorage */
getAllItemsFromLocalStorage = () => {
  let key = "";
  let value = "";
  for (let i = 0; i < itemCount; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
  }
};

/* Display todo as the page loads */
window.addEventListener("DOMContentLoaded", () => {
  getAllItemsFromLocalStorage();
  let tableRows = "";
  for (let i = 0; i < itemCount; i++) {
    let title = localStorage.key(i);
    tableRows += `
      <div class="todo-entry">
        <div class="action-data">
          <h4 style="font-weight:normal">${localStorage.key(i)}</h4>
        </div>
        <div class="action-data">
          <p>${localStorage.getItem(title)}</p>
        </div>
        <div class="action">
        <button class="edit" data-index="${i}">Edit</button>
        <button class="delete" data-index="${i}">Delete</button>
        </div>
      </div>
    `;
  }
  document.getElementById("todo-list").innerHTML = tableRows;

  document.getElementById("todo-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
      const dataIndex = event.target.getAttribute("data-index");
      openEditModal(dataIndex);
    } else if (event.target.classList.contains("delete")) {
      const dataIndex = event.target.getAttribute("data-index");
      deleteTodoEntry(dataIndex);
    }
  });

  const searchInput = document.querySelector("#todo-search");
  updateTable = () => {
    let tableRows = "";
    for (let i = 0; i < itemCount; i++) {
      let title = localStorage.key(i);
      let content = localStorage.getItem(title);

      // Filter based on search input
      const searchTerm = searchInput.value.toLowerCase();
      if (
        title.toLowerCase().includes(searchTerm) ||
        content.toLowerCase().includes(searchTerm)
      ) {
        tableRows += `
          <div class="todo-entry">
            <div class="action-data">
              <h4 style="font-weight:normal">${title}</h4>
            </div>
            <div class="action-data">
              <p>${content}</p>
            </div>
            <div class="action">
              <button class="edit" data-index="${i}">Edit</button>
              <button class="delete" data-index="${i}">Delete</button>
            </div>
          </div>
        `;
      }
    }
    document.getElementById("todo-list").innerHTML = tableRows;
  };
  searchInput.addEventListener("input", updateTable);  
});

/* Function to delete a todo */
deleteTodoEntry = (index) => {
  const title = localStorage.key(index);
  localStorage.removeItem(title);
  location.reload();
};

/* Function to edit a todo */
openEditModal = (index) => {
  const title = localStorage.key(index);
  const todoText = localStorage.getItem(title);

  const modal = document.getElementById("editModal");
  const editInput = document.getElementById("editInput");
  const saveEditButton = document.getElementById("saveEdit");

  editInput.value = todoText;

  modal.style.display = "flex";
  const windowHeight = window.innerHeight;
  const modalHeight = modal.offsetHeight;
  const topPosition = (windowHeight - modalHeight) / 2;
  modal.style.top = `${topPosition}px`;

  saveEditButton.addEventListener("click", () => {
    const newData = editInput.value;
    if (newData !== "") {
      localStorage.setItem(title, newData);
      modal.style.display = "none";
      location.reload();
    }
  });

  const closeModal = document.getElementsByClassName("close")[0];
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};