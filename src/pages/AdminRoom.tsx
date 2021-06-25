import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

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
  return (
    <PageRoomContent>
      <HeaderRoomContent>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => {}}>
              Encerrar Sala
            </Button>
            {user && <Button onClick={signOutUser}>Sair</Button>}
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
              >
                <button
                  type="button"
                  onClick={() => {
                    if (question.id) handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </QuestionListComponent>
      </MainRoomContent>
    </PageRoomContent>
  );
}
