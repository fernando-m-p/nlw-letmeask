import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question/Question";
import { RoomCode } from "../components/RoomCode";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import {
  PageRoomContent,
  HeaderRoomContent,
  MainRoomContent,
  RoomTitle,
  QuestionListComponent,
} from "../styles/Room.style";
import { database } from "../services/firebase";
import { ButtonsQuestionStyled } from "../components/Question/Question.style";

type RoomsParams = {
  id: string;
};

export function AdminRoom() {
  const { user, signOutUser } = useAuth();
  const params = useParams<RoomsParams>();
  const history = useHistory();
  const roomId = params.id;
  const { questions, title } = useRoom({ roomId });

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleCheckQuestionAnswered(
    questionId: string,
    isAnswered: boolean
  ) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered });
  }

  async function handleHighLightQuestion(
    questionId: string,
    isHighlighted: boolean
  ) {
    await database
      .ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted });
  }

  return (
    <PageRoomContent>
      <HeaderRoomContent>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={() => {
                handleEndRoom();
              }}
            >
              Encerrar Sala
            </Button>
            {user && (
              <Button
                onClick={() => {
                  signOutUser();
                  history.push("/");
                }}
              >
                Sair
              </Button>
            )}
          </div>
        </div>
      </HeaderRoomContent>
      <MainRoomContent>
        <RoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </RoomTitle>

        <QuestionListComponent>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                <ButtonsQuestionStyled
                  type="button"
                  onClick={() => {
                    if (question.id)
                      handleCheckQuestionAnswered(
                        question.id,
                        !question.isAnswered
                      );
                  }}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida." />
                </ButtonsQuestionStyled>
                {question.isAnswered || (
                  <ButtonsQuestionStyled
                    type="button"
                    onClick={() => {
                      if (question.id)
                        handleHighLightQuestion(
                          question.id,
                          !question.isHighlighted
                        );
                    }}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </ButtonsQuestionStyled>
                )}
                <ButtonsQuestionStyled
                  type="button"
                  onClick={() => {
                    if (question.id) handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </ButtonsQuestionStyled>
              </Question>
            );
          })}
        </QuestionListComponent>
      </MainRoomContent>
    </PageRoomContent>
  );
}
