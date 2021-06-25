import { ReactNode } from "react";
import {
  ButtonsDivQuestionStyled,
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
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <QuestionStyled
      className={`${isAnswered ? " answered " : ""} ${
        isHighlighted && !isAnswered ? " highlighted " : ""
      }`}
    >
      <p>{content}</p>
      <footer>
        <UserInfoStyled>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfoStyled>
        <ButtonsDivQuestionStyled>{children}</ButtonsDivQuestionStyled>
      </footer>
    </QuestionStyled>
  );
}
