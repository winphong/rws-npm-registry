import styled from "styled-components";

export const VFlex = styled.div<{ horizontal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HFlex = styled.div<{ horizontal?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const HCenterFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const CenterFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
