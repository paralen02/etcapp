package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Favoritos")
public class Favoritos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idFavoritos;
    
@ManyToOne
@JoinColumn(name = "publicacion_id")
private Publicaciones publicacion;

@ManyToOne
@JoinColumn(name = "comprador_id")
private Compradores comprador;


    public Favoritos() { }

    public Favoritos(int idFavoritos, Publicaciones publicacion, Compradores comprador) {
        this.idFavoritos = idFavoritos;
        this.publicacion = publicacion;
this.comprador = comprador;
    }

    public int getIdFavoritos() {
        return idFavoritos;
    }

    public void setIdFavoritos(int idFavoritos) {
        this.idFavoritos = idFavoritos;
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
}
