import styled from "styled-components";

export const ButtonStyled = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.textWhite};
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  &.outlined {
    background: ${(props) => props.theme.colors.background};
    border: 1px solid ${(props) => props.theme.colors.purple};
    color: ${(props) => props.theme.colors.text};
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

  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;

  display: flex;

  div {
    background: ${(props) => props.theme.colors.purple};

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
