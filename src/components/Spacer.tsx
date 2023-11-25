import styled from "styled-components";

export const Spacer = styled.div<{ height?: string }>`
  height: ${(props) => props.height ?? "1.5vh"};
`;
