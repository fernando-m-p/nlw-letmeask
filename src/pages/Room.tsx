import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import {
  PageRoomContent,
  HeaderRoomContent,
  MainRoomContent,
  RoomTitle,
  TextAreaNewQuestion,
  FormFooter,
} from "../styles/Room.style";

type FirebaseQuestions = Record<string, Question>;
type Question = {
  id?: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomsParams = {
  id: string;
};

export function Room() {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const params = useParams<RoomsParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          const quest: Question = value;
          quest.id = key;
          return quest;
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;
    if (!user) {
      throw new Error("You must be logged in");
    }
    const question = {
      title: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionRef = database.ref(`rooms/${roomId}/questions`);

    await questionRef.push(question);

    setNewQuestion("");
  }

  return (
    <PageRoomContent>
      <HeaderRoomContent>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            {!user || <Button onClick={signOutUser}>Sair</Button>}
          </div>
        </div>
      </HeaderRoomContent>
      <MainRoomContent>
        <RoomTitle>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </RoomTitle>
        <form action="" onSubmit={handleSendQuestion}>
          <TextAreaNewQuestion
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <FormFooter>
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button onClick={signInWithGoogle}>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </form>
        {JSON.stringify(questions)}
      </MainRoomContent>
    </PageRoomContent>
  );
}
