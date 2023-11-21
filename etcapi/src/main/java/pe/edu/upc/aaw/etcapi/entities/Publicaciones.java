package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Publicaciones")
public class Publicaciones {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPublicaciones;

    @Column(name = "titulo")
private String titulo;
@Column(name = "descripcion")
private String descripcion;
@Column(name = "fecha")
private LocalDateTime fecha;

    
@ManyToOne
@JoinColumn(name = "producto_id")
private Productos producto;


    public Publicaciones() { }

    public Publicaciones(int idPublicaciones, String titulo, String descripcion, LocalDateTime fecha) {
        this.idPublicaciones = idPublicaciones;
        this.titulo = titulo;
this.descripcion = descripcion;
this.fecha = fecha;
    }

    public int getIdPublicaciones() {
        return idPublicaciones;
    }

    public String getTitulo() {
    return titulo;
}

public void setTitulo(String titulo) {
    this.titulo = titulo;
}

public String getDescripcion() {
    return descripcion;
}

public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}
}
