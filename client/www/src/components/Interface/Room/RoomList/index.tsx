"use client";

import { useEffect, useState } from "react";
import { styled } from "@kuma-ui/core";
import Link from "next/link";

import ws from "@/lib/ws";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);

  const socket = new ws();

  useEffect(() => {
    socket.get("getRooms");
    socket.listen("rooms", (data: any) => {
      setRooms(data.rooms);
    });
  }, []);

  return (
    <Container>
      {rooms.length > 0
        ? rooms.map(({ roomID }) => {
            return (
              <Room key={roomID}>
                <div>
                  <span>RoomID : </span>
                  <span>{roomID}</span>
                </div>
                <Link href={`/room/${roomID}`}>Rejoindre la salle </Link>
              </Room>
            );
          })
        : "No rooms"}
    </Container>
  );
}

const Container = styled("div")`
  color: white;
`;

const Room = styled("div")`
  display: flex;
  align-items: center;
  font-family: var(--nativeFont, sans-serif);

  background: #161b21;
  margin: 10px;
  padding: 20px;
  height: 50px;

  & a {
    margin-left: auto;
    text-decoration: none;
    transition: 250ms;
    color: #3498db;

    &:hover {
      text-decoration: none;
    }
  }
`;
