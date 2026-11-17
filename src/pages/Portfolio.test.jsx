import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "./Portfolio";
import { projects } from "../data/projects";

// jsdom 尚未實作 dialog 的 showModal / close
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
  };
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );

const cardTitles = () =>
  [...document.querySelectorAll(".project-card-title")].map((el) => el.textContent);

describe("作品集頁", () => {
  it("預設顯示全部作品", () => {
    renderPage();
    expect(cardTitles()).toHaveLength(projects.length);
  });

  it("點選分類後只顯示該分類的作品，並標示目前選取的篩選器", () => {
    renderPage();
    const aiTab = screen.getByRole("button", { name: "AI 應用" });

    fireEvent.click(aiTab);

    const expected = projects.filter((p) => p.category.includes("ai")).map((p) => p.title);
    expect(cardTitles()).toEqual(expected);
    expect(aiTab).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "全部" })).toHaveAttribute("aria-pressed", "false");
  });

  it("點作品卡會開啟詳情，方向鍵可切到下一件", () => {
    renderPage();
    fireEvent.click(document.querySelector(".project-card"));

    const dialog = document.querySelector("dialog.project-modal");
    expect(within(dialog).getByRole("heading", { level: 2, hidden: true })).toHaveTextContent(
      projects[0].title,
    );

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByRole("heading", { level: 2, hidden: true })).toHaveTextContent(
      projects[1].title,
    );
  });
});
