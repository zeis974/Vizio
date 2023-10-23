import pc from "picocolors";
import logger from "./logger";
import { throws } from "assert";

interface User {
 id: string;
 application: string;
 roomID?: string;
}

interface Room {
 type: string;
 rooms: Array<{ roomID: string; users: string[] }>;
}

const users: User[] = [];
const socketRoom: Room = {
 type: "rooms",
 rooms: [],
};

const server = Bun.serve<User>({
 fetch(req, server) {
  const incomingHeaders = new Headers(req.headers);
  const headers = Object.fromEntries(incomingHeaders);
  const res = new Response("Hello world");

  res.headers.set("Access-Control-Allow-Origin", "*");

  const success = server.upgrade(req, {
   data: {
    id: new URL(req.url).searchParams.get("id") || "Client #",
    application: headers["sec-websocket-protocol"],
    socketID: headers["sec-websocket-key"],
   },
  });

  if (success) {
   return undefined;
  }

  return res;
 },
 websocket: {
  open(ws) {
   ws.subscribe("rooms");
   ws.subscribe("usersInRoom");

   const { id, application } = ws.data;
   const userExist = users.find((user) => user.id === id);

   if (userExist) {
    logger("reconnect", application, id);
    return;
   }

   logger("connect", application, id);

   users.push({ id, application });
  },

  message(ws, message) {
   const data = JSON.parse(message.toString());

   if (data.type === "getRooms") {
    ws.publish("rooms", JSON.stringify(socketRoom));
   }

   if (data.type === "createRoom") {
    const roomID = data.roomID;

    socketRoom.rooms.push({
     roomID,
     users: [],
    });
   }

   if (data.type === "join room") {
    const roomID = data.data;
    const userID = ws.data.id;

    const room = socketRoom.rooms.find((room) => room.roomID === roomID);

    if (room && !room.users.includes(userID)) {
     room.users.push(userID);
    }
   }

   if (data.type === "getUsers") {
    const roomID = data.data;
    const usersInRoom = socketRoom.rooms.find((room) => room.roomID === roomID);

    const usersInRoomData = { type: "usersInRoom", rooms: usersInRoom };

    ws.publish("usersInRoom", JSON.stringify(usersInRoomData));
   }
  },

  close(ws, code, message) {
   logger("disconnected", ws.data.application, ws.data.id);
   ws.unsubscribe("room");
   ws.unsubscribe("usersInRoom");
  },

  publishToSelf: true,
 },
 port: 2626,
});

console.log(
 pc.blue("[SERVER] ") + `Listening on http://${server.hostname}:${server.port}`
);
