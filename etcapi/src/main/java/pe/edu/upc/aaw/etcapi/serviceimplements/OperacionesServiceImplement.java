package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Operaciones;
import pe.edu.upc.aaw.etcapi.repositories.IOperacionesRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IOperacionesService;
import java.util.List;

@Service
public class OperacionesServiceImplement implements IOperacionesService {
    @Autowired
    private IOperacionesRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Operaciones Operaciones) {
        myRepository.save(Operaciones);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idOperaciones){
        myRepository.deleteById(idOperaciones);
    }

    // Retrieve an items by ID from table
    @Override
    public Operaciones listId(int idOperaciones){
        return myRepository.findById(idOperaciones).orElse(new Operaciones());
    }

    // Retrieve all items from table
    @Override
    public List<Operaciones> list() {
        return myRepository.findAll();
    }
}
