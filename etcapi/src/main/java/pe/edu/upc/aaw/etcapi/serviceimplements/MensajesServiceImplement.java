package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Mensajes;
import pe.edu.upc.aaw.etcapi.repositories.IMensajesRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IMensajesService;
import java.util.List;

@Service
public class MensajesServiceImplement implements IMensajesService {
    @Autowired
    private IMensajesRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Mensajes Mensajes) {
        myRepository.save(Mensajes);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idMensajes){
        myRepository.deleteById(idMensajes);
    }

    // Retrieve an items by ID from table
    @Override
    public Mensajes listId(int idMensajes){
        return myRepository.findById(idMensajes).orElse(new Mensajes());
    }

    // Retrieve all items from table
    @Override
    public List<Mensajes> list() {
        return myRepository.findAll();
    }
    @Override
    public List<Mensajes> findByChat(int idChat) {
        return myRepository.findByChat(idChat);
    }
}
