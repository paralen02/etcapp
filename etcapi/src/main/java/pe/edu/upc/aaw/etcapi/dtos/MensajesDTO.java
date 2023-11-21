package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class MensajesDTO {
    
    private int idMensajes;
    private LocalDateTime fecha;
private String mensaje;
private Chats chat;

    public int getIdMensajes() {
        return idMensajes;
    }

    public void setIdMensajes(int idMensajes) {
        this.idMensajes = idMensajes;
    }

    public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public String getMensaje() {
    return mensaje;
}

public void setMensaje(String mensaje) {
    this.mensaje = mensaje;
}

public Chats getChat() {
    return chat;
}

public void setChat(Chats chat) {
    this.chat = chat;
}
}
