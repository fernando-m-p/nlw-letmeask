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
};

export function Question({ content, author }: QuestionProps) {
  return (
    <QuestionStyled>
      <p>{content}</p>
      <footer>
        <UserInfoStyled>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfoStyled>
        <ButtonsQuestionStyled />
      </footer>
    </QuestionStyled>
  );
}
