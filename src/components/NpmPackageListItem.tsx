import { Card, Divider } from "@blueprintjs/core";
import { NpmPackage } from "../typings/npm";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { VFlex } from "./Flex";
import { formatDistance } from "date-fns";

const NpmPackageListItem = ({ npmPackage }: { npmPackage: NpmPackage }) => {
  return (
    <StyledLink to={`package/${npmPackage.name}`}>
      <StyledCard>
        <VFlex>
          <strong className="bp5-text-large">{npmPackage.name}</strong>
          <Ellipsis className="bp5-text-muted">
            {npmPackage.description}
          </Ellipsis>
          <HorizontalDivider />
          <PublishedText>
            {npmPackage.publisher?.username} last published{" "}
            <em>
              {formatDistance(new Date(npmPackage.date), new Date(), {
                addSuffix: true,
              })}
            </em>
          </PublishedText>
        </VFlex>
      </StyledCard>
    </StyledLink>
  );
};

const Ellipsis = styled.span`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  :hover & {
    color: inherit;
    text-decoration: none;
  }
`;

const HorizontalDivider = styled(Divider)`
  width: 100%;
  margin: 1% 0;
`;

const PublishedText = styled.span`
  font-size: 12px;
  color: #0a346e;
`;

const StyledCard = styled(Card)`
  margin: 0 4px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  min-height: 110px;
`;

export default NpmPackageListItem;
