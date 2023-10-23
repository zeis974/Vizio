"use client";

import ws from "@/lib/ws";
import { styled } from "@kuma-ui/core";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const regex = /\/room\/(.*)/;
  const roomAlreadyExist = pathname.match(regex);

  const socket = new ws();

  const createRoom = () => {
    if (!roomAlreadyExist) {
      let uuid = self.crypto.randomUUID();

      router.push(`room/${uuid}`);

      socket.createRoom(uuid)
    }
  };

  return (
    <Container>
      <span>Room</span>
      <button
        type="button"
        onClick={createRoom}
        aria-disabled={roomAlreadyExist ? true : undefined}
      >
        Crée une salle
      </button>
    </Container>
  );
}

const Container = styled("div")`
  margin: 10px;
  padding: 10px;
  height: 60px;
  border-radius: 5px;
  border: 3px solid var(--darkBlue);
  display: flex;
  align-items: center;

  & > span {
    color: white;
    font-family: var(--nativeFont);
    font-weight: 500;
  }

  & > button {
    margin-left: auto;
    padding: 10px 15px;
    background: #2ecc71;
    border: 1px solid #2ecc71;
    transition: 150ms;
    cursor: pointer;
    border-radius: 3px;
    color: #272727;
    font-weight: bold;
    user-select: none;

    &[aria-disabled="true"] {
      opacity: 0.7;
      pointer-events: none;
    }

    &:hover {
      background: transparent;
      color: white;
    }
  }
`;
