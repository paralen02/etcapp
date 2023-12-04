package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ChatsDTO {
    
    private int idChats;
    private boolean estado;
private Compras compra;
private Compradores comprador;
private Vendedores vendedor;

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

public Compradores getComprador() {
    return comprador;
}

public void setComprador(Compradores comprador) {
    this.comprador = comprador;
}

public Vendedores getVendedor() {
    return vendedor;
}

public void setVendedor(Vendedores vendedor) {
    this.vendedor = vendedor;
}
}
