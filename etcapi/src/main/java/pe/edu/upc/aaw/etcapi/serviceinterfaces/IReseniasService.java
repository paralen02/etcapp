package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Resenias;
import java.util.List;

public interface IReseniasService {
    void insert(Resenias Resenias);
    void delete(int id);
    Resenias listId(int id);
    List<Resenias> list();
}