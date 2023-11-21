package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Caracteristicas;
import pe.edu.upc.aaw.etcapi.repositories.ICaracteristicasRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICaracteristicasService;
import java.util.List;

@Service
public class CaracteristicasServiceImplement implements ICaracteristicasService {
    @Autowired
    private ICaracteristicasRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Caracteristicas Caracteristicas) {
        myRepository.save(Caracteristicas);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idCaracteristicas){
        myRepository.deleteById(idCaracteristicas);
    }

    // Retrieve an items by ID from table
    @Override
    public Caracteristicas listId(int idCaracteristicas){
        return myRepository.findById(idCaracteristicas).orElse(new Caracteristicas());
    }

    // Retrieve all items from table
    @Override
    public List<Caracteristicas> list() {
        return myRepository.findAll();
    }
}
