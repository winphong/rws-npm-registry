import _ from "lodash";
import { useAppContext } from "src/common/context";
import NpmPackageListItem from "./NpmPackageListItem";
import styled from "styled-components";

const NpmPackageList = () => {
  const packages = useAppContext().packages;

  return (
    <Grid>
      {_.map(packages, (pkg) => {
        return (
          <NpmPackageListItem npmPackage={pkg.package} key={pkg.package.name} />
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default NpmPackageList;
