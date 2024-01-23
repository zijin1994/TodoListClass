const Todo = require('./todo');
const TodoList = require('./todoList');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  //1. size
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  //2. toArray
  test('test todolist toArray method', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  //3. first
  test('test todolist first method', () => {
    expect(list.first()).toEqual(todo1);
  });
  //4. last
  test('test todolist last method', () => {
    expect(list.last()).toEqual(todo3);
  });
  //5. shift
  test('shift method remove and return first element', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });
  //6. pop
  test('pop method remove and return last element', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });
  //7. isDone
  test('isDone method returns true if all done', () => {
    expect(list.isDone()).not.toBeTruthy();
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();
  });
  //8. add
  test('add gives typeError if added item is not todo', () => {
    expect(() => list.add(1)).toThrow(TypeError);
  });
  //9. itemAt
  test('itemAt raise referenceError if specifiy index with no element', () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
    expect(list.itemAt(2)).toEqual(todo3);
  });
  //10. markDoneAt
  test('markDoneAt marks todo at given index done, throw reference error if given index with no element', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
    list.markDoneAt(2);
    expect(todo3.isDone()).toBeTruthy();
  });
  //11. markUndoneAt
  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);
    list.markAllDone();
    list.markUndoneAt(1);
    expect(todo2.isDone()).toBe(false);
    expect(todo1.isDone()).toBeTruthy();
    expect(todo3.isDone()).toBeTruthy();
  });
  //12. markAllDone
  test('markAllDone marks all todos done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });
  //13. removeAt
  test('removeAt removes todo at given index and return it', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual(todo2);
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo3);
  });
  //14. toString part1
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });
  //15. toString part2
  test('toString returns string with one done mark', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;
    list.markDoneAt(1);
    expect(list.toString()).toBe(string);
  });
  //16. toString part3
  test('toString returns string with all todos done mark', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    list.markAllDone();
    expect(list.toString()).toBe(string);
  });
  //17. forEach
  test('forEach iterate through list', () => {
    list.forEach((todo, index) => {
      expect(todo).toEqual(list.itemAt(index));
    });
  });
  //18. filter
  test('filter returns a new todolist that matches the callback requirement', () => {
    list.markDoneAt(1);
    let undoneTodos = list.filter(todo => !(todo.isDone()));
    let doneTodos = list.filter(todo => todo.isDone());
    expect(undoneTodos.toArray()).toEqual([todo1, todo3]);
    expect(doneTodos.toArray()).toEqual([todo2]);
    
    let newTodo = new TodoList(list.title);
    newTodo.add(todo2);
    expect(newTodo.title).toBe(list.title);
    expect(newTodo.toString()).toBe(doneTodos.toString());
  });
});