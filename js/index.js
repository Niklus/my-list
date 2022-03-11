"use strict";

import { StorageWrapper } from "./storage.js";

class MyList {
  constructor() {
    this.store = new StorageWrapper("local");
    this.todos = this.store.get("todos") ?? [
      { title: "Get some rest 😴" },
      { title: "Buy Coffee ☕️" },
      { title: "Study 📘" },
    ];
    this.fab = document.querySelector("#fab");
    this.item = document.querySelector("#item-name");
    this.modal = document.querySelector("#modal");
    this.form = document.querySelector("#item-form");
    this.list = document.querySelector("#list");
    this.clearBtn = document.querySelector(".clearBtn");
    this.init();
  }

  init() {
    this.fab.addEventListener("click", () => {
      this.toggleModal();
    });

    this.clearBtn.addEventListener("click", () => {
      if (this.todos.length > 0 && confirm("Clear all ...are you sure?")) {
        this.clearItems();
      }
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.toggleModal();
      this.item.blur();

      if (this.item.value) {
        this.todos.push({ title: this.item.value });
        this.store.set("todos", this.todos);
        this.render();
        this.item.value = "";
      }
    });

    this.render();
  }

  toggleModal() {
    this.modal.classList.toggle("show");
    this.fab.classList.toggle("rotate");
    if (modal.classList.contains("show")) {
      this.item.focus();
    } else {
      this.item.blur();
    }
  }

  deleteItem(index) {
    this.todos.splice(index, 1);
    this.store.set("todos", this.todos);
    this.render();
  }

  clearItems() {
    this.todos = [];
    this.store.set("todos", this.todos);
    this.render();
  }

  addListeners() {
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    if (deleteBtns.length === 0) {
      return;
    } else {
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.deleteItem(e.currentTarget.id);
        });
      });
    }
  }

  render() {
    this.list.innerHTML = "";
    this.todos.forEach((item, index) => {
      list.insertAdjacentHTML(
        "afterbegin",
        `<li tabindex="0" class="deletable">
        <span class="delete">
          <b>${item.title}</b> 
          <svg class="deleteBtn" id=${index} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </span>
      </li>`
      );
    });
    this.addListeners();
  }
}

new MyList();
