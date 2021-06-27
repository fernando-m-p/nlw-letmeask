import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/Button";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";

import {
  PageRoomContent,
  HeaderRoomContent,
  MainRoomContent,
  RoomTitle,
  RoomListComponent,
} from "../styles/Room.style";
import { FormEvent, useEffect, useState } from "react";
import { Room } from "../components/Room/Room";
import { MainContent, Separator } from "../styles/Auth.style";
import { useHistory } from "react-router-dom";

type RoomType = {
  id: string;
  title: string;
  authorId: string;
  endedAt: boolean;
};

type FirebaseRooms = Record<
  string,
  { authorId: string; title: string; endedAt?: string }
>;

export function ListRooms() {
  const { user, signOutUser } = useAuth();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [roomCode, setRoomCode] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert("Room does not exist!");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed");
    }

    history.push(`/rooms/${roomCode}`);
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/`);
    roomRef.on("value", (Listroom) => {
      if (user) {
        const listRoomsFirebase: FirebaseRooms = Listroom.val() ?? {};
        const rooms: RoomType[] = Object.entries(listRoomsFirebase)
          .filter(([value, room]) => {
            return room.authorId === user.id;
          })
          .map(([value, room]) => {
            const item: RoomType = {
              id: value,
              title: room.title,
              authorId: room.authorId,
              endedAt: !!room.endedAt,
            };
            return item;
          });
        setRooms(rooms);
      } else {
        history.push("/");
      }
    });
    return () => {
      roomRef.off("value");
    };
  }, [user]);

  return (
    <PageRoomContent>
      <HeaderRoomContent>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>{!user || <Button onClick={signOutUser}>Sair</Button>}</div>
        </div>
      </HeaderRoomContent>
      <MainRoomContent>
        {rooms.length > 0 && (
          <>
            <RoomTitle>
              <h1>Salas de {user?.name}</h1>
            </RoomTitle>
            <RoomListComponent>
              {rooms.map((room) => {
                return (
                  <Room
                    id={room.id}
                    title={room.title}
                    authorId={room.authorId}
                    endedAt={room.endedAt}
                  />
                );
              })}
            </RoomListComponent>
          </>
        )}
        <footer>
          <MainContent>
            <h2>Entre em uma sala</h2>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={(event) => setRoomCode(event.target.value)}
                value={roomCode}
              ></input>
              <Button type="submit">Entrar na Sala</Button>
            </form>
          </MainContent>
          <MainContent>
            <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Nome da sala"
                onChange={(event) => setNewRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">Criar Sala</Button>
            </form>
          </MainContent>
        </footer>
      </MainRoomContent>
    </PageRoomContent>
  );
}
