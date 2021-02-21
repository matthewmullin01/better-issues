import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Paginator } from "./Paginator";

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("Event Handlers", () => {
  test("onNext callback works", () => {
    const onNext = jest.fn();
    render(<Paginator onNext={onNext} onPrev={() => null} hasNext={true} hasPrev={true} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(onNext).toBeCalled();
  });
  test("onPrev callback works", () => {
    const onPrev = jest.fn();
    render(<Paginator onNext={() => null} onPrev={onPrev} hasNext={true} hasPrev={true} />);
    fireEvent.click(screen.getByText(/Prev/i));
    expect(onPrev).toBeCalled();
  });
  test("callbacks not called if not clicked", () => {
    const onClick = jest.fn();
    render(<Paginator onNext={onClick} onPrev={onClick} hasNext={true} hasPrev={true} />);
    expect(onClick).not.toBeCalled();
  });
});

describe("Disabled States", () => {
  test("onNext disabled if NOT hasNext", () => {
    const onNext = jest.fn();
    render(<Paginator onNext={onNext} onPrev={() => null} hasNext={false} hasPrev={true} />);
    const button = screen.getByText(/Next/i);
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(onNext).not.toBeCalled();
  });
  test("onPrev disabled if NOT hasPrev", () => {
    const onPrev = jest.fn();
    render(<Paginator onNext={() => null} onPrev={onPrev} hasNext={true} hasPrev={false} />);
    const button = screen.getByText(/Prev/i);
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(onPrev).not.toBeCalled();
  });
  test("Neither disabled if hasNext and hasPrev", () => {
    render(<Paginator onNext={() => null} onPrev={() => null} hasNext={true} hasPrev={true} />);
    const prev = screen.getByText(/Prev/i);
    const next = screen.getByText(/Next/i);
    expect(prev).not.toBeDisabled();
    expect(next).not.toBeDisabled();
  });
});
