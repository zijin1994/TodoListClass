// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.
const Todo = require("./todo.js");

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  // rest of class needs implementation
  add(...todos) {
    if (!(todos.every(todo => todo instanceof Todo))) {
      throw new TypeError('can only add Todo objects');
    }
    
    this.todos.push(...todos);
  }
  
  size() {
    return this.todos.length;
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.size() - 1];
  }
  
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }
  
  _validateIndex(index) {
    if (!(this.todos[index])) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
  
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }
  
  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }
  
  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
  
  shift() {
    return this.todos.shift();
  }
  
  pop() {
    return this.todos.pop();
  }
  
  removeAt(index) {
    this._validateIndex(index);
    
    return this.todos.splice(index, 1).pop();
  }
  
  toString() {
    let result = `---- ${this.title} ----`;
    
    this.todos.forEach(todo => result += `\n${todo}`);
    
    return result;
  }
  
  forEach(callback) {
    this.todos.forEach(callback);
  }
  
  filter(callback) {
    let result = new TodoList(this.title);
    
    this.forEach(todo => {
      if (callback(todo)) result.add(todo);
    });
    
    return result;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title)
               .first();
  }
  
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }
  
  markDone(title) {
    let todo = this.findByTitle(title);
    
    if (todo) todo.markDone();
  }
  
  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
  
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }
  
  toArray() {
    // let todoArray = [];
    
    // this.forEach(todo => {
    //   let todoCopy = {};
    //   Object.assign(todoCopy, todo);
    //   todoArray.push(todoCopy);
    // });
    // return todoArray;
    return this.todos.slice();
  }
}

// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// todo1.markDone();
// todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);
// let firstTodo = list.filter(todo => todo.isDone()).first();
// console.log(firstTodo);
// let findTodo = list.findByTitle('go shopping');
// console.log(findTodo);
// let allDoneTodos = list.allDone();
// console.log(allDoneTodos);
// let allUnDoneTodos = list.allNotDone();
// console.log(allUnDoneTodos);
// list.markDone('Clean room');
// console.log(list);
// list.markAllDone();
// console.log(list);
// list.markAllUndone();
// console.log(list);

// console.log(list.toArray());

module.exports = TodoList;