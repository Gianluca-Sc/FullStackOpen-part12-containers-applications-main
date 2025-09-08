import { render, screen } from "@testing-library/react";
import Todo from "./Todo.jsx";
import { describe, it } from "vitest";

describe("Todo", () => {
  it("Should renders content", () => {
    const todo = {
      text: "Test todo",
      done: true,
    };

    render(
      <Todo todo={todo} onClickComplete={vi.fn()} onClickDelete={vi.fn()} />
    );

    const element = screen.getByText("Test todo");
    expect(element).toBeDefined();
  });
});
