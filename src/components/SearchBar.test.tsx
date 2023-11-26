import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { AppContextProvider } from "src/common/context";
import { useLocation } from "react-router-dom";
import api from "src/api";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
  useLocation: jest.fn(),
}));

jest.mock("src/api", () => ({
  searchNpmRegistry: async () => null,
}));

describe("search bar", () => {
  let mockUseLocation: jest.Mock, searchNpmRegistrySpy: jest.SpyInstance;

  beforeEach(() => {
    mockUseLocation = useLocation as jest.Mock;
    mockUseLocation.mockReturnValue({ search: "" });

    searchNpmRegistrySpy = jest.spyOn(api, "searchNpmRegistry");
    searchNpmRegistrySpy.mockResolvedValue({
      objects: [{ package: { name: "dnd" } }],
      total: 1,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders search bar", () => {
    render(
      <AppContextProvider>
        <SearchBar />
      </AppContextProvider>
    );

    const linkElement = screen.getByTestId("test-search-bar");
    expect(linkElement).toBeInTheDocument();
  });

  test("should handle change in input and set query string to url", async () => {
    render(
      <AppContextProvider>
        <SearchBar />
      </AppContextProvider>
    );

    fireEvent.change(screen.getByTestId("test-search-bar"), {
      target: { value: "dnd" },
    });

    await waitFor(() => expect(searchNpmRegistrySpy).toHaveBeenCalledTimes(1));

    expect(mockedUseNavigate.mock.calls[0][0].search).toEqual(
      "?search=dnd&offset=0"
    );
  });

  test("should call api and set query string to url if the search args on first load is not empty", async () => {
    mockUseLocation.mockReturnValue({ search: "?search=lodash" });

    searchNpmRegistrySpy.mockResolvedValue({
      objects: [{ package: { name: "lodash" } }],
      total: 1,
    });

    render(
      <AppContextProvider>
        <SearchBar />
      </AppContextProvider>
    );

    await waitFor(() => expect(searchNpmRegistrySpy).toHaveBeenCalledTimes(1));

    await screen.findByDisplayValue("lodash");

    expect(mockedUseNavigate.mock.calls[0][0].search).toEqual(
      "?search=lodash&offset=0"
    );
  });
});
