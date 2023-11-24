import { useAppContext } from "src/common/context";
import styled from "styled-components";

const SearchResultCount = () => {
  const context = useAppContext();

  if (context.numOfResult === null) {
    return null;
  }

  return (
    <Container>
      <span>{context.numOfResult} packages found</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default SearchResultCount;
