import { Spinner } from "@blueprintjs/core";
import { useNavigation } from "react-router";
import NpmPackageList from "src/components/NpmPackageList";
import SearchBar from "src/components/SearchBar";
import SearchResultCount from "src/components/SearchResultCount";
import { Spacer } from "src/components/Spacer";
import styled from "styled-components";

const Home = () => {
  const { state } = useNavigation();

  const isLoading = state === "loading";

  return (
    <Flex>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>

          <Spacer />

          <SearchResultCount />

          <Spacer />

          <PackageListContainer>
            <NpmPackageList />
          </PackageListContainer>
        </>
      )}
    </Flex>
  );
};

const SearchBarContainer = styled.div`
  flex: 1;
  width: 30vw;
  align-items: flex-start;

  @media (max-width: 600px) {
    width: auto;
  }
`;

const PackageListContainer = styled.div`
  flex: 9;
  max-height: 90vh;
`;

const Flex = styled.div`
  width: 90vw;
  height: 100vh;
  padding: 2vh;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Home;
