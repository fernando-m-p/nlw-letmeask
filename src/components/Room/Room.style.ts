import styled from "styled-components";

export const RoomStyled = styled.div`
  background: #fefefe;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + & {
    margin-top: 8px;
  }

  p {
    color: #29292e;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;
  }
`;
