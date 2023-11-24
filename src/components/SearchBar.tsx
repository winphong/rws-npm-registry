import { ChangeEvent, useState } from "react";
import { searchNpmRegistry } from "src/api";
import { useAppContext } from "src/common/context";
import { IconSize, InputGroup, Spinner } from "@blueprintjs/core";
import _ from "lodash";

const SearchBar = () => {
  const context = useAppContext();

  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(false);
  };

  const debouncedSearch = _.debounce(search, 500);

  return (
    <InputGroup
      asyncControl
      leftIcon="search"
      onChange={debouncedSearch}
      placeholder="Search packages..."
      rightElement={
        isLoading ? <Spinner size={IconSize.STANDARD} /> : undefined
      }
    />
  );
};
export default SearchBar;
