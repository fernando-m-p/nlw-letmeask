import styled from "styled-components";

export const PageRoomContent = styled.div`
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
`;
export const HeaderRoomContent = styled.header`
  background: ${(props) => props.theme.colors.background};
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.shadow};

  .content {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      max-height: 45px;
      filter: invert(${(props) => (props.theme.title === "light" ? 0 : 1)});
    }
    > div {
      display: flex;
      > button {
        height: 40px;
        margin-left: 10px;
      }
    }
  }
`;
export const MainRoomContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    color: ${(props) => props.theme.colors.text};
  }

  span {
    margin-left: 16px;
    background: ${(props) => props.theme.colors.purple};
    border-radius: 9999px;
    padding: 8px 16px;
    color: ${(props) => props.theme.colors.textWhite};
    font-weight: 500;
    font-size: 14px;
  }
`;

export const TextAreaNewQuestion = styled.textarea`
  width: 100%;
  border: 0;
  padding: 16px;
  border-radius: 8px;
  background: #fefefe;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  resize: vertical;
  min-height: 130px;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  .user-info {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    span {
      margin-left: 8px;
      color: ${(props) => props.theme.colors.text};
      font-weight: 500;
      font-size: 14px;
    }
  }

  > span {
    font-size: 14px;
    color: ${(props) => props.theme.colors.text};
    font-weight: 500;

    button {
      background: transparent;
      border: 0;
      color: ${(props) => props.theme.colors.linkprimary};
      text-decoration: underline;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

export const QuestionListComponent = styled.div`
  margin-top: 32px;
`;
