import NpmPackageList from "src/components/NpmPackageList";
import SearchBar from "src/components/SearchBar";
import SearchResultCount from "src/components/SearchResultCount";
import styled from "styled-components";

const Main = () => {
  return (
    <Flex>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>

      <Spacer />

      <SearchResultCount />

      <Spacer />

      <PackageListContainer>
        <NpmPackageList />
      </PackageListContainer>
    </Flex>
  );
};

const SearchBarContainer = styled.div`
  flex: 1;
  width: 30vw;
  align-items: flex-start;
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

const Spacer = styled.div`
  height: 1.5vh;
`;

export default Main;
