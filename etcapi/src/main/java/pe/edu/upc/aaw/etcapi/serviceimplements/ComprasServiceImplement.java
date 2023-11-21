package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Compras;
import pe.edu.upc.aaw.etcapi.repositories.IComprasRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IComprasService;
import java.util.List;

@Service
public class ComprasServiceImplement implements IComprasService {
    @Autowired
    private IComprasRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Compras Compras) {
        myRepository.save(Compras);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idCompras){
        myRepository.deleteById(idCompras);
    }

    // Retrieve an items by ID from table
    @Override
    public Compras listId(int idCompras){
        return myRepository.findById(idCompras).orElse(new Compras());
    }

    // Retrieve all items from table
    @Override
    public List<Compras> list() {
        return myRepository.findAll();
    }
}
