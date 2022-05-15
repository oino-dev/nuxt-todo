import { createPinia, setActivePinia } from "pinia";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { useTodoStore } from "./todo";

beforeAll(() => {
  setActivePinia(createPinia());
});

describe("useTodoStore", () => {
  let store: ReturnType<typeof useTodoStore>;

  beforeEach(() => {
    store = useTodoStore();
  });

  afterEach(() => {
    store.$reset();
  });

  test("create a store", () => {
    expect(store).toBeDefined();
  });

  test("initializes with empty items", () => {
    expect(store.items).toStrictEqual([]);
  });

  test("create a todo", () => {
    store.add({ title: "Text for test" });
    expect(store.items[0]).toBeDefined();
    expect(store.items[0].title).toBe("Text for test");
  });

  test("gets by id", () => {
    store.add({ title: "Text get by id" });

    const item = store.items[0];
    const todo = store.getById(item.id);

    expect(todo).toStrictEqual(item);
  });

  test("gets ordered todos without mutating state", () => {
    const items = [
      {
        createdAt: new Date(2020, 2, 14),
      },
      {
        createdAt: new Date(2021, 1, 11),
      },
      {
        createdAt: new Date(2022, 5, 10),
      },
    ];

    //@ts-ignore
    store.items = items;

    const orderTodos = store.getOrderedTodos;

    expect(orderTodos[0].createdAt.getFullYear()).toBe(2020);
    expect(orderTodos[1].createdAt.getFullYear()).toBe(2021);
    expect(orderTodos[2].createdAt.getFullYear()).toBe(2022);
    expect(store.items[0].createdAt.getFullYear()).toBe(2020);
  });

  test("remove todo", () => {
    store.add({ title: "todo for remove" });

    const todo = store.items[0];
    store.remove(todo.id);

    expect(store.items).toStrictEqual([]);
  });

  test("update todo", () => {
    store.add({ title: "todo for update " });

    const todo = store.items[0];
    store.update(todo.id, { done: true });

    const updated = store.items[0];
    expect(updated.done).toBe(true);
  });

  test("update a todo title", () => {
    store.add({ title: "todo for update " });

    const todo = store.items[0];
    store.update(todo.id, { title: "tested" });

    const updated = store.items[0];
    expect(updated.title).toBe("tested");
  });
});
