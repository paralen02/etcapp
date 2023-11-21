package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Role;
import java.util.List;

public interface IRoleService {
    void insert(Role Role);
    void delete(Long id);
    Role listId(Long id);
    List<Role> list();
}