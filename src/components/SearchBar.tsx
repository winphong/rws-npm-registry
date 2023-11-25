import { ChangeEvent, useEffect, useState } from "react";
import { searchNpmRegistry } from "src/api";
import { useAppContext } from "src/common/context";
import { IconSize, InputGroup, Spinner } from "@blueprintjs/core";
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const context = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const search = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (_.isEmpty(query)) {
      return;
    }

    setIsLoading(true);

    const response = await searchNpmRegistry({
      offset: 0,
      searchString: query,
    });
    context.updatePackageList(response.objects);
    context.setNumOfResult(response.total);

    searchParams.set("search", query);
    searchParams.set("offset", "0");
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchInitialSearchResult = async () => {
      const offset = searchParams.get("offset") ?? 0;
      const numericOffSet = Number(offset);

      const nonNegativeOffset = Math.max(numericOffSet, 0);
      const floorToMultipleOf20 = Math.floor(nonNegativeOffset / 20) * 20;

      try {
        const response = await searchNpmRegistry({
          offset: floorToMultipleOf20,
          searchString: searchQuery,
        });
        context.updatePackageList(response.objects);
        context.setNumOfResult(response.total);

        searchParams.set("offset", `${floorToMultipleOf20}`);
        navigate({
          pathname: location.pathname,
          search: `?${searchParams.toString()}`,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = _.debounce(search, 500);

  return (
    <InputGroup
      data-testid="test-search-bar"
      asyncControl
      leftIcon="search"
      defaultValue={searchQuery ?? ""}
      onChange={debouncedSearch}
      placeholder="Search packages..."
      rightElement={
        isLoading ? <Spinner size={IconSize.STANDARD} /> : undefined
      }
    />
  );
};
export default SearchBar;
