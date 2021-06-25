import { ReactNode } from "react";
import {
  ButtonsQuestionStyled,
  QuestionStyled,
  UserInfoStyled,
} from "./Question.style";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function Question({ content, author, children }: QuestionProps) {
  return (
    <QuestionStyled>
      <p>{content}</p>
      <footer>
        <UserInfoStyled>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfoStyled>
        <ButtonsQuestionStyled>{children}</ButtonsQuestionStyled>
      </footer>
    </QuestionStyled>
  );
}
