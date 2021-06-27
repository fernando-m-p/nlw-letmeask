import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type useRoomPros = {
  roomId: string;
};

type QuestionType = {
  id?: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<string, QuestionType>;

export function useRoom({ roomId }: useRoomPros) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      if (room.exists()) {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions =
          databaseRoom.questions ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions)
          .map(([key, value]) => {
            const quest: QuestionType = value;
            quest.id = key;
            quest.likeCount = Object.values(value.likes ?? {}).length;
            quest.likeId = Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0];
            return quest;
          })
          .sort((a: QuestionType, b: QuestionType) => {
            if (a.isAnswered) {
              return 1;
            } else if (b.isAnswered) {
              return -1;
            }
            if (a.isHighlighted) {
              return -1;
            } else if (b.isHighlighted) {
              return 1;
            }

            return b.likeCount - a.likeCount;
          });

        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
      } else {
        alert("Room does not exist!");
        history.push("/rooms/new");
      }

      return () => {
        roomRef.off("value");
      };
    });
  }, [roomId, history, user?.id]);

  return { questions, title };
}
