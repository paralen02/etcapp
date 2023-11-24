package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Chats")
public class Chats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idChats;

    @Column(name = "estado")
private boolean estado;

    
@ManyToOne
@JoinColumn(name = "compra_id")
private Compras compra;


    public Chats() { }

    public Chats(int idChats, boolean estado, Compras compra) {
        this.idChats = idChats;
        this.estado = estado;
this.compra = compra;
    }

    public int getIdChats() {
        return idChats;
    }

    public boolean getEstado() {
    return estado;
}

public void setEstado(boolean estado) {
    this.estado = estado;
}

public Compras getCompra() {
    return compra;
}

public void setCompra(Compras compra) {
    this.compra = compra;
}
}
