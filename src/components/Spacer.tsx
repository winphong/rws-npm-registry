import styled from "styled-components";

export const Spacer = styled.div<
  { height: string; width?: string } | { height?: string; width: string }
>`
  ${(props) => (props.height ? `height: ${props.height}` : "")};
  ${(props) => (props.width ? `width: ${props.width}` : "")};
`;
