import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as Context from "src/common/context";
import Paginator from "./Paginator";
import api from "src/api";
import { useLocation } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
  useLocation: jest.fn(),
}));

jest.mock("src/api", () => ({
  searchNpmRegistry: async () => null,
}));

jest.mock("src/common/context", () => {
  const originalModule = jest.requireActual("src/common/context");

  return {
    ...originalModule,
    useAppContext: () => ({
      packages: [],
      updatePackageList: jest.fn(),
      setNumOfResult: jest.fn(),
      numOfResult: 60,
    }),
  };
});

describe("search bar", () => {
  let mockUseLocation: jest.Mock, searchNpmRegistrySpy: jest.SpyInstance;

  beforeEach(() => {
    mockUseLocation = useLocation as jest.Mock;
    mockUseLocation.mockReturnValue({ search: "?search=name&offset=0" });

    searchNpmRegistrySpy = jest.spyOn(api, "searchNpmRegistry");
    searchNpmRegistrySpy.mockResolvedValue({});

    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders paginator", () => {
    render(
      <Context.AppContextProvider>
        <Paginator />
      </Context.AppContextProvider>
    );

    const linkElement = screen.getByTestId("test-paginator");
    expect(linkElement).toBeInTheDocument();
  });

  test("handle next click", async () => {
    render(
      <Context.AppContextProvider>
        <Paginator />
      </Context.AppContextProvider>
    );

    fireEvent.click(screen.getByTestId("test-paginator-next"));
    await screen.findByTestId("test-paginator-right-spinner");

    await waitFor(() => expect(searchNpmRegistrySpy).toHaveBeenCalledTimes(1));
    await screen.findByTestId("test-paginator-right-cursor");

    expect(mockedUseNavigate.mock.calls[0][0].search).toEqual(
      "?search=name&offset=20"
    );
  });

  test("handle prev click", async () => {
    mockUseLocation.mockReturnValueOnce({ search: "?search=name&offset=40" });

    render(
      <Context.AppContextProvider>
        <Paginator />
      </Context.AppContextProvider>
    );

    const indicatorBefore = screen.getByTestId("test-paginator-current-page");
    expect(indicatorBefore).toBeInTheDocument();
    expect(indicatorBefore.textContent).toEqual("3");

    fireEvent.click(screen.getByTestId("test-paginator-prev"));
    await screen.findByTestId("test-paginator-left-spinner");

    await waitFor(() => expect(searchNpmRegistrySpy).toHaveBeenCalledTimes(1));

    mockUseLocation.mockReturnValue({ search: "?search=name&offset=20" });

    await screen.findByTestId("test-paginator-left-cursor");

    const indicatorAfter = screen.getByTestId("test-paginator-current-page");
    expect(indicatorAfter.textContent).toEqual("2");

    expect(mockedUseNavigate.mock.calls[0][0].search).toEqual(
      "?search=name&offset=20"
    );
  });

  // test("handle prev click", async () => {
  //   mockUseLocation.mockReturnValue({ search: "?search=name&offset=60" });

  //   render(
  //     <Context.AppContextProvider>
  //       <Paginator />
  //     </Context.AppContextProvider>
  //   );

  //   fireEvent.click(screen.getByTestId("test-paginator-prev"));

  //   await waitFor(() => expect(searchNpmRegistrySpy).toHaveBeenCalledTimes(1));
  //   await screen.findByTestId("test-paginator-left-cursor");

  //   expect(mockedUseNavigate.mock.calls[0][0].search).toEqual(
  //     "?search=name&offset=40"
  //   );
  // });
});
