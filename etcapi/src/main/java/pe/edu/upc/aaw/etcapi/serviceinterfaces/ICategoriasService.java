package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Categorias;
import java.util.List;

public interface ICategoriasService {
    void insert(Categorias Categorias);
    void delete(int id);
    Categorias listId(int id);
    List<Categorias> list();
    Categorias findByTipo(String tipo);
}