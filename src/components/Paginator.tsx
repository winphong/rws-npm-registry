import { Button } from "@blueprintjs/core";
import { useLocation, useNavigate } from "react-router";
import { searchNpmRegistry } from "src/api";
import { useAppContext } from "src/common/context";
import { CenterFlex } from "./Flex";

const Paginator = () => {
  const context = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const offset = searchParams.get("offset");
  const query = searchParams.get("search");

  if (!context.numOfResult || offset === null || query === null) {
    return null;
  }

  const maxPage = Math.ceil(context.numOfResult / 20);
  const currentPage = Math.min(Math.floor(Number(offset) / 20 + 1), maxPage);

  const handleChangePage = async (steps: number) => {
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
  };
  const handleNext20 = async () => {
    // TODO: Debounce
    await handleChangePage(20);
  };

  const handlePrevious20 = async () => {
    // TODO: Debounce
    await handleChangePage(-20);
  };

  return (
    <CenterFlex>
      <Button onClick={handlePrevious20} disabled={currentPage === 1}>
        {"<"}
      </Button>
      <div style={{ width: "10px" }}></div>
      <span>{currentPage}</span>
      <div style={{ width: "10px" }}></div>
      <Button onClick={handleNext20} disabled={currentPage === maxPage}>
        {">"}
      </Button>
    </CenterFlex>
  );
};

export default Paginator;
