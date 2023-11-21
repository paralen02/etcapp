package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Asesorias;
import pe.edu.upc.aaw.etcapi.repositories.IAsesoriasRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IAsesoriasService;
import java.util.List;

@Service
public class AsesoriasServiceImplement implements IAsesoriasService {
    @Autowired
    private IAsesoriasRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Asesorias Asesorias) {
        myRepository.save(Asesorias);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idAsesorias){
        myRepository.deleteById(idAsesorias);
    }

    // Retrieve an items by ID from table
    @Override
    public Asesorias listId(int idAsesorias){
        return myRepository.findById(idAsesorias).orElse(new Asesorias());
    }

    // Retrieve all items from table
    @Override
    public List<Asesorias> list() {
        return myRepository.findAll();
    }
}
