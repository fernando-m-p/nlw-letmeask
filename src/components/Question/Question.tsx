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
  likeCount?: number;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
  likeCount = -1,
}: QuestionProps) {
  return (
    <QuestionStyled
      className={`${isAnswered ? " answered " : ""} ${
        isHighlighted && !isAnswered ? " highlighted " : ""
      }`}
    >
      <div className="content-likes">
        <p>{content}</p>
        {likeCount !== -1 &&
          (likeCount > 0 ? (
            <span>{likeCount} Curtidas</span>
          ) : (
            <span> {0} Curtidas</span>
          ))}
      </div>
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
