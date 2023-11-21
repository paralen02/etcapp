package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ChatsDTO {
    
    private int idChats;
    private boolean estado;
private Compras compra;

    public int getIdChats() {
        return idChats;
    }

    public void setIdChats(int idChats) {
        this.idChats = idChats;
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
