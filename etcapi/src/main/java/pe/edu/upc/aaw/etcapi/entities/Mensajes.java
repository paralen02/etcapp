package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Mensajes")
public class Mensajes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMensajes;

    @Column(name = "fecha")
private LocalDateTime fecha;
@Column(name = "mensaje")
private String mensaje;

    
@ManyToOne
@JoinColumn(name = "chat_id")
private Chats chat;


    public Mensajes() { }

    public Mensajes(int idMensajes, LocalDateTime fecha, String mensaje) {
        this.idMensajes = idMensajes;
        this.fecha = fecha;
this.mensaje = mensaje;
    }

    public int getIdMensajes() {
        return idMensajes;
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
}
