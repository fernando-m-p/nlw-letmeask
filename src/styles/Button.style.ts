import styled from "styled-components";

export const ButtonStyled = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: #835afd;
  color: #ffffff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  &.outlined {
    background: #ffffff;
    border: 1px solid #835afd;
    color: #835afd;
  }

  img {
    margin-right: 8px;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CodeRoomButtonStyled = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: #fff;
  border: 1px solid #835afd;
  cursor: pointer;

  display: flex;

  div {
    background: #835afd;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    width: 230px;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const SwitchDivTheme = styled.div`
  background: transparent;
  display: block;
  height: 40px;
  position: absolute;
  padding: 30px;
  right: 5%;
`;
