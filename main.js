const list_el = document.getElementById("list");
const create_el = document.getElementById("create");

const filter_btns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

let todos = [];

create_el.addEventListener("click", CreateNewTodo);

filter_btns.forEach((btn) => {

    btn.addEventListener("click", () => {

        currentFilter = btn.dataset.filter;

        filter_btns.forEach((button) => {
            button.classList.remove("active");
        });

        btn.classList.add("active");

        FilterTodos();

    });

});

function FilterTodos() {

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {

        if (currentFilter === "all") {
            item.style.display = "flex";
        }

        else if (item.classList.contains(currentFilter)) {
            item.style.display = "flex";
        }

        else {
            item.style.display = "none";
        }

    });

}

function CreateNewTodo() {

    const item = {
        id: new Date().getTime(),
        text: "",
        status: "incomplete",
        dueDate: ""
    };

    todos.unshift(item);

    const { item_el, input_el } = CreateTodoElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    save();

}

function CreateTodoElement(item) {

    const item_el = document.createElement("div");

    item_el.classList.add("item");
    item_el.classList.add(item.status);

    item.dueDate = item.dueDate || "";

    const status_btn_el = document.createElement("button");

    status_btn_el.classList.add("status-btn");

    status_btn_el.innerText = item.status;

    status_btn_el.addEventListener("click", () => {

        if (item.status === "incomplete") {
            item.status = "inprogress";
        }

        else if (item.status === "inprogress") {
            item.status = "complete";
        }

        else {
            item.status = "incomplete";
        }

        item_el.classList.remove(
            "incomplete",
            "inprogress",
            "complete"
        );

        item_el.classList.add(item.status);

        status_btn_el.innerText = item.status;

        save();

        FilterTodos();

    });

    const input_el = document.createElement("input");

    input_el.type = "text";

    input_el.value = item.text;

    input_el.setAttribute("disabled", "");

    // ✅ NEW: due date input
    const date_el = document.createElement("input");
    date_el.type = "date";
    date_el.value = item.dueDate || "";

    date_el.addEventListener("change", () => {
        item.dueDate = date_el.value;
        save();
    });

    const actions_el = document.createElement("div");

    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");

    edit_btn_el.classList.add("material-symbols-outlined");

    edit_btn_el.innerText = "edit";

    const remove_btn_el = document.createElement("button");

    remove_btn_el.classList.add(
        "material-symbols-outlined",
        "remove-btn"
    );

    remove_btn_el.innerText = "remove_circle";

    actions_el.appendChild(edit_btn_el);
    actions_el.appendChild(remove_btn_el);

    item_el.appendChild(status_btn_el);
    item_el.appendChild(input_el);
    item_el.appendChild(date_el); // ✅ NEW LINE
    item_el.appendChild(actions_el);

    input_el.addEventListener("input", () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", () => {

        input_el.setAttribute("disabled", "");

        save();

    });

    edit_btn_el.addEventListener("click", () => {

        input_el.removeAttribute("disabled");

        input_el.focus();

    });

    remove_btn_el.addEventListener("click", () => {

        todos = todos.filter((t) => t.id !== item.id);

        item_el.remove();

        save();

    });

    return {
        item_el,
        input_el,
        edit_btn_el,
        remove_btn_el
    };

}

function save() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}

function load() {

    const data = localStorage.getItem("todos");

    if (data) {

        todos = JSON.parse(data);

        todos.forEach((item) => {

            const { item_el } = CreateTodoElement(item);

            list_el.appendChild(item_el);

        });

    }

}

load();