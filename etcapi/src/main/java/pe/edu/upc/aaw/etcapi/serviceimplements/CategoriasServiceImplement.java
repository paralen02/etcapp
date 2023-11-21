package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Categorias;
import pe.edu.upc.aaw.etcapi.repositories.ICategoriasRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICategoriasService;
import java.util.List;

@Service
public class CategoriasServiceImplement implements ICategoriasService {
    @Autowired
    private ICategoriasRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Categorias Categorias) {
        myRepository.save(Categorias);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idCategorias){
        myRepository.deleteById(idCategorias);
    }

    // Retrieve an items by ID from table
    @Override
    public Categorias listId(int idCategorias){
        return myRepository.findById(idCategorias).orElse(new Categorias());
    }

    // Retrieve all items from table
    @Override
    public List<Categorias> list() {
        return myRepository.findAll();
    }
}
