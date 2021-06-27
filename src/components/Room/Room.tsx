import { Button } from "../Button";
import { RoomStyled } from "./Room.style";
import { useHistory } from "react-router-dom";
type RoomProps = {
  id: string;
  title: string;
  authorId: string;
  endedAt: boolean;
};

export function Room({ title, id, endedAt }: RoomProps) {
  const history = useHistory();

  return (
    <RoomStyled>
      <p>{title}</p>
      <footer>
        {!endedAt ? (
          <Button
            onClick={() => {
              history.push(`/admin/rooms/${id}`);
            }}
          >
            Entrar
          </Button>
        ) : (
          "Sala Fechada"
        )}
      </footer>
    </RoomStyled>
  );
}
