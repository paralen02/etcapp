import { Chats } from "./chats";

export class Mensajes {
  idMensajes: number = 0;
  fecha: Date = new Date();
  mensaje: string = "";
  chat: Chats = new Chats();
}
