import styled from "styled-components";

export const Flex = styled.div<{ horizontal?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  align-items: flex-start;
`;
