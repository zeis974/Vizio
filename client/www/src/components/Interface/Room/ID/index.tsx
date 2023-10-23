"use client";

import { useEffect, useRef, useState } from "react";

import ws from "@/lib/ws";

import VideoLayout from "@/components/Interface/Room/VideoLayout";
import Error, { ErrorType } from "@/components/Interface/ui/Error";

export default function RoomID({ roomID }: { roomID: string }) {
  const [error, setError] = useState({
    error: false,
    cause: "" as ErrorType,
  });

  const socketRef = useRef();
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef([]);

  const socket = new ws();

  useEffect(() => {
    socket
      .getRooms(roomID)
      .then(() => {
        getUserMedia();
      })
      .catch((err) => {
        console.log(err);
        setError({ error: true, cause: "not exist" });
      });

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (userVideo.current) {
          userVideo.current.srcObject = stream;

          socket.emit("join room", roomID);
          // socket.listen("usersInRoom", (data: any) => {
          //   console.log(data);
          // });
        }
      } catch (err: any) {
        let e = err.toString();

        console.log(e);

        if (e.includes("system")) {
          setError({ error: true, cause: "system" });
        } else {
          setError({ error: true, cause: "user" });
        }
      }
    };
  }, [roomID]);

  if (error.error) return <Error error={error} />;

  return <VideoLayout ref={userVideo} />;
}
