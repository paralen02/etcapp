package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Favoritos;
import java.util.List;

public interface IFavoritosService {
    void insert(Favoritos Favoritos);

    void delete(int idCompradores, int idPublicaciones);
    Favoritos listId(int id);
    List<Favoritos> list();
    boolean esFavorito(int idCompradores, int idPublicaciones);
}