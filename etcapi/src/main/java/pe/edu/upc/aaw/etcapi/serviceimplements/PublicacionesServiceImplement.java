package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Publicaciones;
import pe.edu.upc.aaw.etcapi.repositories.IPublicacionesRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IPublicacionesService;
import java.util.List;

@Service
public class PublicacionesServiceImplement implements IPublicacionesService {
    @Autowired
    private IPublicacionesRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Publicaciones Publicaciones) {
        myRepository.save(Publicaciones);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idPublicaciones){
        myRepository.deleteById(idPublicaciones);
    }

    // Retrieve an items by ID from table
    @Override
    public Publicaciones listId(int idPublicaciones){
        return myRepository.findById(idPublicaciones).orElse(new Publicaciones());
    }

    // Retrieve all items from table
    @Override
    public List<Publicaciones> list() {
        return myRepository.findAll();
    }

    @Override
    public List<Publicaciones> listIds(List<Integer> ids){
        return myRepository.findAllById(ids);
    }

}
