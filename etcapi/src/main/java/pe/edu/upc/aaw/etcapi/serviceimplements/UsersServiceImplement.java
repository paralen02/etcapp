package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.upc.aaw.etcapi.entities.Users;
import pe.edu.upc.aaw.etcapi.repositories.UserRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IUsersService;
import java.util.List;

@Service
public class UsersServiceImplement implements IUsersService {
    @Autowired
    private UserRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Users Users) {
        myRepository.save(Users);
    }
    @Override
    @Transactional
    public void insertAndAssignRole(Users user, String roleName) {
        // Guardar el usuario y obtener el ID generado
        Long userId = myRepository.save(user).getId();
        // Asignar el rol al usuario
        myRepository.insRol(roleName, userId);
    }

    // Delete an item by ID on table
    @Override
    @Transactional
    public void delete(Long idUsers) {
        myRepository.deleteRolesByUserId(idUsers);
        myRepository.deleteById(idUsers);
    }

    // Retrieve an items by ID from table
    @Override
    public Users listId(Long idUsers){
        return myRepository.findById(idUsers).orElse(new Users());
    }

    // Retrieve all items from table
    @Override
    public List<Users> list() {
        return myRepository.findAll();
    }

    @Override
    public Users findByUsername(String username) {
        return myRepository.findByUsername(username);
    }
}
