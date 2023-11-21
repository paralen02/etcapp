package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Repartidores;
import pe.edu.upc.aaw.etcapi.repositories.IRepartidoresRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IRepartidoresService;
import java.util.List;

@Service
public class RepartidoresServiceImplement implements IRepartidoresService {
    @Autowired
    private IRepartidoresRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Repartidores Repartidores) {
        myRepository.save(Repartidores);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idRepartidores){
        myRepository.deleteById(idRepartidores);
    }

    // Retrieve an items by ID from table
    @Override
    public Repartidores listId(int idRepartidores){
        return myRepository.findById(idRepartidores).orElse(new Repartidores());
    }

    // Retrieve all items from table
    @Override
    public List<Repartidores> list() {
        return myRepository.findAll();
    }
}
