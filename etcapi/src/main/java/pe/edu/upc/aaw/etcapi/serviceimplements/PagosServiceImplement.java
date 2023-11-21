package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Pagos;
import pe.edu.upc.aaw.etcapi.repositories.IPagosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IPagosService;
import java.util.List;

@Service
public class PagosServiceImplement implements IPagosService {
    @Autowired
    private IPagosRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Pagos Pagos) {
        myRepository.save(Pagos);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idPagos){
        myRepository.deleteById(idPagos);
    }

    // Retrieve an items by ID from table
    @Override
    public Pagos listId(int idPagos){
        return myRepository.findById(idPagos).orElse(new Pagos());
    }

    // Retrieve all items from table
    @Override
    public List<Pagos> list() {
        return myRepository.findAll();
    }
}
