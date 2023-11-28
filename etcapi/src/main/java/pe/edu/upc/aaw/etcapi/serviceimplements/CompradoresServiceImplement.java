package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Compradores;
import pe.edu.upc.aaw.etcapi.repositories.ICompradoresRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICompradoresService;
import java.util.List;

@Service
public class CompradoresServiceImplement implements ICompradoresService {
    @Autowired
    private ICompradoresRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Compradores Compradores) {
        myRepository.save(Compradores);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idCompradores){
        myRepository.deleteById(idCompradores);
    }

    // Retrieve an items by ID from table
    @Override
    public Compradores listId(int idCompradores){
        return myRepository.findById(idCompradores).orElse(new Compradores());
    }

    // Retrieve all items from table
    @Override
    public List<Compradores> list() {
        return myRepository.findAll();
    }

    @Override
    public Compradores findByUsername(String username) {
        return myRepository.findByUsername(username);
    }
}
