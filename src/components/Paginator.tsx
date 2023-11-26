import { Button, Spinner } from "@blueprintjs/core";
import { useLocation, useNavigate } from "react-router-dom";
import { searchNpmRegistry } from "src/api";
import { useAppContext } from "src/common/context";
import { CenterFlex } from "./Flex";
import { useState } from "react";
import { Spacer } from "./Spacer";

const Paginator = () => {
  const context = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [loader, setLoader] = useState({
    isNextLoading: false,
    isPrevLoading: false,
  });

  const searchParams = new URLSearchParams(location.search);
  const offset = searchParams.get("offset");
  const query = searchParams.get("search");

  if (!context.numOfResult || offset === null || query === null) {
    return null;
  }

  const maxPage = Math.ceil(context.numOfResult / 20);
  const currentPage = Math.min(Math.floor(Number(offset) / 20 + 1), maxPage);

  const handleChangePage = async (steps: number) => {
    const isIncrement = steps > 0;
    setLoader({ isNextLoading: isIncrement, isPrevLoading: !isIncrement });
    const response = await searchNpmRegistry({
      offset: Number(offset) + steps,
      searchString: query,
    });
    context.updatePackageList(response.objects);

    searchParams.set("offset", `${Number(offset) + steps}`);
    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoader({ isNextLoading: false, isPrevLoading: false });
  };

  const handleNext20 = async () => {
    await handleChangePage(20);
  };

  const handlePrevious20 = async () => {
    await handleChangePage(-20);
  };

  const isLoading = loader.isPrevLoading || loader.isNextLoading;

  return (
    <CenterFlex data-testid="test-paginator">
      <Button
        data-testid="test-paginator-prev"
        onClick={handlePrevious20}
        disabled={currentPage === 1 || isLoading}
      >
        {loader.isPrevLoading ? (
          <Spinner data-testid="test-paginator-left-spinner" size={10} />
        ) : (
          <span data-testid="test-paginator-left-cursor">&lt;</span>
        )}
      </Button>
      <Spacer width="1vw" />
      <span data-testid="test-paginator-current-page">{currentPage}</span>
      <Spacer width="1vw" />
      <Button
        data-testid="test-paginator-next"
        onClick={handleNext20}
        disabled={currentPage === maxPage || isLoading}
      >
        {loader.isNextLoading ? (
          <Spinner data-testid="test-paginator-right-spinner" size={10} />
        ) : (
          <span data-testid="test-paginator-right-cursor">&gt;</span>
        )}
      </Button>
    </CenterFlex>
  );
};

export default Paginator;
