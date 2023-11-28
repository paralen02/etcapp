package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Compradores;
import java.util.List;

public interface ICompradoresService {
    void insert(Compradores Compradores);
    void delete(int id);
    Compradores listId(int id);
    List<Compradores> list();
    Compradores findByUsername(String username);
}