package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Resenias")
public class Resenias {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idResenias;

    @Column(name = "comentario")
private String comentario;
@Column(name = "calificacion")
private int calificacion;
@Column(name = "fecha")
private LocalDateTime fecha;

    
@ManyToOne
@JoinColumn(name = "compra_id")
private Compras compra;


    public Resenias() { }

    public Resenias(int idResenias, String comentario, int calificacion, LocalDateTime fecha, Compras compra) {
        this.idResenias = idResenias;
        this.comentario = comentario;
this.calificacion = calificacion;
this.fecha = fecha;
this.compra = compra;
    }

    public int getIdResenias() {
        return idResenias;
    }

    public String getComentario() {
    return comentario;
}

public void setComentario(String comentario) {
    this.comentario = comentario;
}

public int getCalificacion() {
    return calificacion;
}

public void setCalificacion(int calificacion) {
    this.calificacion = calificacion;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Compras getCompra() {
    return compra;
}

public void setCompra(Compras compra) {
    this.compra = compra;
}
}
