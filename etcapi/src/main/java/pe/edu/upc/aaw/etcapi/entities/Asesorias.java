package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Asesorias")
public class Asesorias {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAsesorias;

    @Column(name = "link")
private String link;
@Column(name = "fecha")
private LocalDateTime fecha;
@Column(name = "motivo")
private String motivo;

    
@ManyToOne
@JoinColumn(name = "compra_id")
private Compras compra;


    public Asesorias() { }

    public Asesorias(int idAsesorias, String link, LocalDateTime fecha, String motivo, Compras compra) {
        this.idAsesorias = idAsesorias;
        this.link = link;
this.fecha = fecha;
this.motivo = motivo;
this.compra = compra;
    }

    public int getIdAsesorias() {
        return idAsesorias;
    }

    public String getLink() {
    return link;
}

public void setLink(String link) {
    this.link = link;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public String getMotivo() {
    return motivo;
}

public void setMotivo(String motivo) {
    this.motivo = motivo;
}

public Compras getCompra() {
    return compra;
}

public void setCompra(Compras compra) {
    this.compra = compra;
}
}
