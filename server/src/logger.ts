import pc from "picocolors";

interface LoggerTypes {
  readonly action: "connect" | "reconnect" | "disconnected";
  readonly application: string;
  readonly id: string;
}

function log(application: string, id: string, text: string) {
  return console.log(
    pc.green(`(${application}) `) +
      pc.red("[CLIENT - ") +
      pc.white(`${id}`) +
      pc.red("]") +
      ` ${text}`
  );
}

export default function logger(
  action: LoggerTypes["action"],
  application: LoggerTypes["application"],
  id: LoggerTypes["id"]
) {
  switch (action) {
    case "connect":
      return log(application, id, "Client connected");
    case "disconnected":
      return log(application, id, "Client disconnected");
    case "reconnect":
      return log(application, id, "Client reconnected");
  }
}
