package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Asesorias;
import java.util.List;

public interface IAsesoriasService {
    void insert(Asesorias Asesorias);
    void delete(int id);
    Asesorias listId(int id);
    List<Asesorias> list();
}