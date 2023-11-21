package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Compras;
import java.util.List;

public interface IComprasService {
    void insert(Compras Compras);
    void delete(int id);
    Compras listId(int id);
    List<Compras> list();
}