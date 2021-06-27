import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import {
  PageAuth,
  Aside,
  Main,
  MainContent,
  CreateRoom,
  Separator,
} from "../styles/Auth.style";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const [roomCode, setRoomCode] = useState("");

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/admin/rooms/list");
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

  return (
    <PageAuth>
      <Aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        ></img>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </Aside>
      <Main>
        <MainContent>
          <img src={logoImg} alt="letmeask"></img>
          <CreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo do Google" />
            Crie sua sala com o Google
          </CreateRoom>
          <Separator>Ou entre em uma sala</Separator>
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
      </Main>
    </PageAuth>
  );
}
