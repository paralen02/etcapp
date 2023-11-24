package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Compras")
public class Compras {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCompras;

    @Column(name = "fecha")
private LocalDateTime fecha;

    
@ManyToOne
@JoinColumn(name = "operacion_id")
private Operaciones operacion;

@ManyToOne
@JoinColumn(name = "publicacion_id")
private Publicaciones publicacion;

@ManyToOne
@JoinColumn(name = "comprador_id")
private Compradores comprador;

@ManyToOne
@JoinColumn(name = "envio_id")
private Envios envio;


    public Compras() { }

    public Compras(int idCompras, LocalDateTime fecha, Operaciones operacion, Publicaciones publicacion, Compradores comprador, Envios envio) {
        this.idCompras = idCompras;
        this.fecha = fecha;
this.operacion = operacion;
this.publicacion = publicacion;
this.comprador = comprador;
this.envio = envio;
    }

    public int getIdCompras() {
        return idCompras;
    }

    public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Operaciones getOperacion() {
    return operacion;
}

public void setOperacion(Operaciones operacion) {
    this.operacion = operacion;
}

public Publicaciones getPublicacion() {
    return publicacion;
}

public void setPublicacion(Publicaciones publicacion) {
    this.publicacion = publicacion;
}

public Compradores getComprador() {
    return comprador;
}

public void setComprador(Compradores comprador) {
    this.comprador = comprador;
}

public Envios getEnvio() {
    return envio;
}

public void setEnvio(Envios envio) {
    this.envio = envio;
}
}
