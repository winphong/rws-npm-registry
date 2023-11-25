import { Button, Spinner } from "@blueprintjs/core";
import { useLocation, useNavigate } from "react-router";
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

  return (
    <CenterFlex>
      <Button
        onClick={handlePrevious20}
        disabled={currentPage === 1 || loader.isPrevLoading}
      >
        {loader.isPrevLoading ? <Spinner size={10} /> : "<"}
      </Button>
      <Spacer width="1vw" />
      <span>{currentPage}</span>
      <Spacer width="1vw" />
      <Button
        onClick={handleNext20}
        disabled={currentPage === maxPage || loader.isNextLoading}
      >
        {loader.isNextLoading ? <Spinner size={10} /> : ">"}
      </Button>
    </CenterFlex>
  );
};

export default Paginator;
