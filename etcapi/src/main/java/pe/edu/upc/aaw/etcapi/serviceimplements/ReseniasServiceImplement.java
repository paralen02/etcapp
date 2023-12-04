package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Resenias;
import pe.edu.upc.aaw.etcapi.repositories.IReseniasRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IReseniasService;
import java.util.List;

@Service
public class ReseniasServiceImplement implements IReseniasService {
    @Autowired
    private IReseniasRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Resenias Resenias) {
        myRepository.save(Resenias);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idResenias){
        myRepository.deleteById(idResenias);
    }

    // Retrieve an items by ID from table
    @Override
    public Resenias listId(int idResenias){
        return myRepository.findById(idResenias).orElse(new Resenias());
    }

    // Retrieve all items from table
    @Override
    public List<Resenias> list() {
        return myRepository.findAll();
    }
    @Override
    public Resenias findByCompra_IdCompras(int idCompra) {
        return myRepository.findByCompra_IdCompras(idCompra);
    }
    @Override
    public List<Resenias> findByVendedor_IdVendedores(int idVendedor) {
        return myRepository.findByVendedor_IdVendedores(idVendedor);
    }
}
