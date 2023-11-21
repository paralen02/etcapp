package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Pagos;
import java.util.List;

public interface IPagosService {
    void insert(Pagos Pagos);
    void delete(int id);
    Pagos listId(int id);
    List<Pagos> list();
}