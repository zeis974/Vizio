"use client";

import { styled } from "@kuma-ui/core";
import { forwardRef, useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import Peer from "simple-peer";

import ws from "@/lib/ws";

type PeerRef = {
  peerID: string;
  peer: Peer.Instance;
}[];

type PeerProps = {
  peerID: string;
  peer: Peer.Instance;
}[];

const VideoLayout = forwardRef<HTMLVideoElement>(function Video(props, ref) {
  const [peers, setPeers] = useState<PeerProps>([]);
  const peersRef = useRef<PeerRef>([]);

  const { id } = useParams();
  const socket = new ws();

  let roomID = id.toString();

  useEffect(() => {
    socket.get("allUsers");
    socket.listen("usersInRoom", (data: any) => {
      console.log(data);
    });
    socket.getAllUsersInRoom(roomID).then((data: any) => {
      if (ref && "current" in ref && ref.current) {
        // The peers array contain object with peerID and peer
        const peers: any = []; /*zeis*/
        let users = data[0].users;

        users.forEach((userID: any) => {
          let callerID = userID; /*zeis*/

          const peer = createPeer(
            userID,
            callerID,
            (ref.current as HTMLVideoElement).srcObject as MediaStream
          );

          peers.push(peer);
          peersRef.current.push({ peerID: userID, peer });
        });
        setPeers(peers);
      }
    });
  }, []);

  return (
    <Container>
      <video muted ref={ref} autoPlay playsInline />
    </Container>
  );
});

export default VideoLayout;

function createPeer(userID: string, callerID: string, stream: MediaStream) {
  const socket = new ws();
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal: any) => {
    socket.emit("sending signal", {
      userID,
      callerID,
      signal,
    });
  });

  return peer;
}

const Container = styled("div")`
  color: red;
`;
