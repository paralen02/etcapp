package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Favoritos;
import pe.edu.upc.aaw.etcapi.repositories.IFavoritosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IFavoritosService;
import java.util.List;

@Service
public class FavoritosServiceImplement implements IFavoritosService {
    @Autowired
    private IFavoritosRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Favoritos Favoritos) {
        myRepository.save(Favoritos);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idCompradores, int idPublicaciones){
        Favoritos favorito = myRepository.findByCompradorIdCompradoresAndPublicacionIdPublicaciones(idCompradores, idPublicaciones);
        if (favorito != null) {
            myRepository.delete(favorito);
        }
    }
    // Retrieve an items by ID from table
    @Override
    public Favoritos listId(int idFavoritos){
        return myRepository.findById(idFavoritos).orElse(new Favoritos());
    }

    // Retrieve all items from table
    @Override
    public List<Favoritos> list() {
        return myRepository.findAll();
    }
    @Override
    public boolean esFavorito(int idCompradores, int idPublicaciones) {
        return myRepository.existsByCompradorIdCompradoresAndPublicacionIdPublicaciones(idCompradores, idPublicaciones);
    }
}
