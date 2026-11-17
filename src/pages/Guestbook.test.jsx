import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Guestbook from "./Guestbook";

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// 依請求方法回應：GET 是留言列表，POST 是送出留言
const stubApi = ({ list = { data: [], nextCursor: null }, post }) => {
  const fetchMock = vi.fn((url, init = {}) =>
    Promise.resolve(init.method === "POST" ? post() : json(200, list)),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <Guestbook />
    </MemoryRouter>,
  );

const fill = (name, content) => {
  fireEvent.change(screen.getByLabelText("稱呼"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("留言"), { target: { value: content } });
};
const submit = () => fireEvent.click(screen.getByRole("button", { name: "送出留言" }));
const postCalls = (fetchMock) => fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");

afterEach(() => vi.unstubAllGlobals());

describe("留言板", () => {
  it("顯示已公開的留言", async () => {
    stubApi({
      list: {
        data: [{ id: 1, name: "小明", content: "網站很清楚", createdAt: "2026-11-16T16:30:00.000Z" }],
        nextCursor: null,
      },
    });
    renderPage();
    expect(await screen.findByText("網站很清楚")).toBeInTheDocument();
    // UTC 16:30 是台北時間隔天的 00:30
    expect(screen.getByText("2026/11/17")).toBeInTheDocument();
  });

  it("沒有留言時顯示空狀態", async () => {
    stubApi({});
    renderPage();
    expect(await screen.findByText("還沒有留言，歡迎成為第一位。")).toBeInTheDocument();
  });

  it("欄位空白時不送出請求，並在欄位旁顯示錯誤", async () => {
    const fetchMock = stubApi({});
    renderPage();
    submit();

    expect(await screen.findByText("請填寫稱呼")).toBeInTheDocument();
    expect(screen.getByText("請填寫留言內容")).toBeInTheDocument();
    expect(screen.getByLabelText("稱呼")).toHaveAttribute("aria-invalid", "true");
    expect(postCalls(fetchMock)).toHaveLength(0);
  });

  it("送出成功後清空表單並告知需要審核", async () => {
    const fetchMock = stubApi({ post: () => json(201, { data: { id: 1, status: "pending" } }) });
    renderPage();
    fill("小明", "你好");
    submit();

    expect(await screen.findByText(/審核通過後就會顯示/)).toBeInTheDocument();
    expect(screen.getByLabelText("稱呼")).toHaveValue("");
    expect(JSON.parse(postCalls(fetchMock)[0][1].body)).toEqual({ name: "小明", content: "你好", website: "" });
  });

  it("後端回報限流時顯示訊息並保留已輸入的內容", async () => {
    stubApi({
      post: () => json(429, { error: { code: "RATE_LIMITED", message: "留言太頻繁，請稍後再試" } }),
    });
    renderPage();
    fill("小明", "你好");
    submit();

    expect(await screen.findByText("留言太頻繁，請稍後再試")).toBeInTheDocument();
    expect(screen.getByLabelText("留言")).toHaveValue("你好");
  });

  it("沒有後端的環境顯示無法使用，而不是一直載入", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("<html>", { headers: { "Content-Type": "text/html" } })),
    );
    renderPage();
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("留言板在這個環境無法使用。"));
  });
});
