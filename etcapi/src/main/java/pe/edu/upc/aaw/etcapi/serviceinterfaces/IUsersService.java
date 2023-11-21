package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Users;
import java.util.List;

public interface IUsersService {
    void insert(Users Users);
    void delete(Long id);
    Users listId(Long id);
    List<Users> list();
    void insertAndAssignRole(Users user, String roleName);
    Users findByUsername(String username);
}