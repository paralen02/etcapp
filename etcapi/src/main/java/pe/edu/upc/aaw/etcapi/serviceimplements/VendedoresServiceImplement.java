package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Vendedores;
import pe.edu.upc.aaw.etcapi.repositories.IVendedoresRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IVendedoresService;
import java.util.List;

@Service
public class VendedoresServiceImplement implements IVendedoresService {
    @Autowired
    private IVendedoresRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Vendedores Vendedores) {
        myRepository.save(Vendedores);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idVendedores){
        myRepository.deleteById(idVendedores);
    }

    // Retrieve an items by ID from table
    @Override
    public Vendedores listId(int idVendedores){
        return myRepository.findById(idVendedores).orElse(new Vendedores());
    }

    // Retrieve all items from table
    @Override
    public List<Vendedores> list() {
        return myRepository.findAll();
    }
}
