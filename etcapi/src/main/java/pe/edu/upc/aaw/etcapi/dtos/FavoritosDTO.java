package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class FavoritosDTO {
    
    private int idFavoritos;
    private Publicaciones publicacion;
private Compradores comprador;

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
