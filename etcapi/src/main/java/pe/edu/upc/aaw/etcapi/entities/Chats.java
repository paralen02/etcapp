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

    
@ManyToOne(optional = true)
@JoinColumn(name = "compra_id")
private Compras compra;

@ManyToOne
@JoinColumn(name = "comprador_id")
private Compradores comprador;

@ManyToOne
@JoinColumn(name = "vendedor_id")
private Vendedores vendedor;


    public Chats() { }

    public Chats(int idChats, boolean estado, Compras compra, Compradores comprador, Vendedores vendedor) {
        this.idChats = idChats;
        this.estado = estado;
this.compra = compra;
this.comprador = comprador;
this.vendedor = vendedor;
    }

    public int getIdChats() {
        return idChats;
    }

    public void setIdChats(int Chats) {
        this.idChats = Chats;
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
