import styled from "styled-components";

export const Container = styled.div`
  padding: 50px;
  max-width: 900px;
  margin: auto;
  display: ${(p) => (p.hidden ? "none" : "flex")};
`;
