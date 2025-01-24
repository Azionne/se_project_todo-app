class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(templateSelector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._completed = data.completed || false;
  }

  _generateDueDate() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      return `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    return "";
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
    this._handleCheck(this._completed);
  };

  _handleDeleteClick = () => {
    this._todoElement.remove();
    this._handleDelete(this._completed);
  };

  _setEventListeners() {
    const checkbox = this._todoElement.querySelector(".todo__completed");
    const deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    checkbox.checked = this._completed;
    checkbox.addEventListener("change", this._toggleCompletion);
    deleteButton.addEventListener("click", this._handleDeleteClick);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDateEl = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    todoDateEl.textContent = this._generateDueDate();

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
