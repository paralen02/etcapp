package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Envios;
import pe.edu.upc.aaw.etcapi.repositories.IEnviosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IEnviosService;
import java.util.List;

@Service
public class EnviosServiceImplement implements IEnviosService {
    @Autowired
    private IEnviosRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Envios Envios) {
        myRepository.save(Envios);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idEnvios){
        myRepository.deleteById(idEnvios);
    }

    // Retrieve an items by ID from table
    @Override
    public Envios listId(int idEnvios){
        return myRepository.findById(idEnvios).orElse(new Envios());
    }

    // Retrieve all items from table
    @Override
    public List<Envios> list() {
        return myRepository.findAll();
    }
}
