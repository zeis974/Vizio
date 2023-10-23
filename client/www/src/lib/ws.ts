declare global {
  interface Window {
    socket: WebSocket;
  }
}

export default class ws {
  private id: string | null;
  private ws: WebSocket;
  private listeners: { [key: string]: Function[] } = {};

  constructor() {
    if (!window.sessionStorage.getItem("SessionID")) {
      window.sessionStorage.setItem("SessionID", Date.now().toString());
    }

    this.id = window.sessionStorage.getItem("SessionID");
    this.ws = this.getWebSocket();
    this.ws.addEventListener("message", (e) => {
      this.handleMessage(e);
    });
  }

  private getWebSocket(): WebSocket {
    if (window.socket) {
      return window.socket;
    } else {
      const WS = new WebSocket(`ws://localhost:2626?id=${this.id}`, "WEB");

      window.socket = WS;
      return WS;
    }
  }

  listen(type: string, callback: Function) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  handleMessage(message: any) {
    const data = JSON.parse(message.data);
    if (this.listeners[data.type]) {
      this.listeners[data.type].forEach((callback) => callback(data));
    }
  }

  initConnection() {
    return new Promise((resolve, reject) => {
      this.ws.addEventListener("open", () => {
        resolve(true);
      });
      this.ws.addEventListener("close", () => {
        console.log("connection fermé par le serveur");
        reject(false);
      });

      this.ws.addEventListener("message", (e) => {
        const message = JSON.stringify(e.data);
      });

      setTimeout(() => {
        reject(false);
      }, 5000);
    });
  }

  get(message: string, data?: string) {
    this.ws.send(JSON.stringify({ type: message, data: data }));
  }

  emit(message: string, data: string | object) {
    const msg = {
      type: message,
      data: data,
    };

    this.ws.send(JSON.stringify(msg));
  }

  createRoom(roomID: string) {
    this.ws.send(JSON.stringify({ type: "createRoom", roomID: roomID }));
  }

  // async getAllUsers() {
  //   const message = { type: "getUsers" };
  //   const event = await new Promise<MessageEvent>((resolve) => {
  //     const callback = (event: MessageEvent) => {
  //       resolve(event);
  //       this.ws.removeEventListener("message", callback);
  //     };
  //     this.ws.addEventListener("message", callback);
  //     this.ws.send(JSON.stringify(message));
  //   });

  //   const data = JSON.parse(event.data);
  //   console.log(data);
  //   if (data.type !== "allUsers") {
  //     throw new Error("Unexpected message type");
  //   }

  //   return data.users;
  // }

  async getRooms(roomIDExist?: string) {
    const message = { type: "getRooms" };
    const event = await new Promise<MessageEvent>((resolve) => {
      const callback = (event: MessageEvent) => {
        resolve(event);
        this.ws.removeEventListener("message", callback);
      };
      this.ws.addEventListener("message", callback);
      this.ws.send(JSON.stringify(message));
    });

    const data = JSON.parse(event.data);
    // if (data.type !== "rooms") {
    //   throw new Error("Unexpected message type");
    // }

    console.log(data);

    if (roomIDExist) {
      const room = data.rooms.find(
        ({ roomID }: { roomID: string }) => roomID === roomIDExist
      );
      if (room) {
        return data.rooms;
      } else {
        throw new Error("Room does not exist");
      }
    } else {
      return data.rooms;
    }
  }

  async getAllUsersInRoom(roomIDExist?: string) {
    const message = { type: "getAllUsersInRoom" };
    const event = await new Promise<MessageEvent>((resolve) => {
      const callback = (event: MessageEvent) => {
        resolve(event);
        this.ws.removeEventListener("message", callback);
      };
      this.ws.addEventListener("message", callback);
      this.ws.send(JSON.stringify(message));
    });

    const data = JSON.parse(event.data);
    console.log(data);

    if (roomIDExist) {
      const room = data.rooms.find(
        ({ roomID }: { roomID: string }) => roomID === roomIDExist
      );
      if (room) {
        return data.rooms;
      } else {
        throw new Error("Room does not exist");
      }
    }
  }

  // getAllUsersInRoom(roomID: string) {
  //   this.ws.send(JSON.stringify({ type: "getUsersInRoom", roomID: roomID }));
  // }

  // async getRoomID(roomID: string) {
  //   const message = { type: "getRoomID", roomID: roomID };
  //   const event = await new Promise<MessageEvent>((resolve) => {
  //     const callback = (event: MessageEvent) => {
  //       resolve(event);
  //       console.log(event);
  //       this.ws.removeEventListener("message", callback);
  //     };
  //     this.ws.addEventListener("message", callback);
  //     this.ws.send(JSON.stringify(message));
  //   });

  //   const data = JSON.parse(event.data);
  //   // if (data.type !== "room") {
  //   //   throw new Error("Unexpected message type");
  //   // }

  //   return "cc";
  // }
}
