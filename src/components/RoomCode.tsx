import copyImg from "../assets/images/copy.svg";

import { CodeRoomButtonStyled } from "../styles/Button.style";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <CodeRoomButtonStyled
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </CodeRoomButtonStyled>
  );
}
