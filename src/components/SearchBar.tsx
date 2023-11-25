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
      size: 20,
    });
    context.updatePackageList(response.objects);
    context.setNumOfResult(response.total);

    searchParams.set("search", query);
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
      try {
        const response = await searchNpmRegistry({
          offset: 0,
          searchString: searchQuery,
          size: 20,
        });
        context.updatePackageList(response.objects);
        context.setNumOfResult(response.total);
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
