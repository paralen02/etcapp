package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Servicios;
import pe.edu.upc.aaw.etcapi.repositories.IServiciosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IServiciosService;
import java.util.List;

@Service
public class ServiciosServiceImplement implements IServiciosService {
    @Autowired
    private IServiciosRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Servicios Servicios) {
        myRepository.save(Servicios);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idServicios){
        myRepository.deleteById(idServicios);
    }

    // Retrieve an items by ID from table
    @Override
    public Servicios listId(int idServicios){
        return myRepository.findById(idServicios).orElse(new Servicios());
    }

    // Retrieve all items from table
    @Override
    public List<Servicios> list() {
        return myRepository.findAll();
    }
}
