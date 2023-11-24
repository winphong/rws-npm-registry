import { Card, Divider } from "@blueprintjs/core";
import { NpmPackage } from "../typings/npm";
import styled from "styled-components";

const NpmPackageListItem = ({ npmPackage }: { npmPackage: NpmPackage }) => {
  return (
    <StyledCard>
      <Flex>
        <strong className="bp5-text-large">{npmPackage.name}</strong>
        <Ellipsis className="bp5-text-muted">{npmPackage.description}</Ellipsis>
        <HorizontalDivider />
        <span>
          {npmPackage.publisher?.username} published {npmPackage.date}
        </span>
      </Flex>
    </StyledCard>
  );
};

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Ellipsis = styled.span`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HorizontalDivider = styled(Divider)`
  width: 100%;
  margin: 1% 0;
`;

const StyledCard = styled(Card)`
  margin: 0 4px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  min-height: 110px;
`;

export default NpmPackageListItem;
