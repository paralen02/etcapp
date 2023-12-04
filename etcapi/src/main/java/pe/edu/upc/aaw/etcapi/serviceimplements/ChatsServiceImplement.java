package pe.edu.upc.aaw.etcapi.serviceimplements;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.entities.Chats;
import pe.edu.upc.aaw.etcapi.repositories.IChatsRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IChatsService;
import java.util.List;

@Service
public class ChatsServiceImplement implements IChatsService {
    @Autowired
    private IChatsRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Chats Chats) {
        myRepository.save(Chats);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idChats){
        myRepository.deleteById(idChats);
    }

    // Retrieve an items by ID from table
    @Override
    public Chats listId(int idChats){
        return myRepository.findById(idChats).orElse(new Chats());
    }

    // Retrieve all items from table
    @Override
    public List<Chats> list() {
        return myRepository.findAll();
    }
    @Override
    public Chats findByCompradorAndVendedor(int idComprador, int idVendedor) {
        return myRepository.findByCompradorAndVendedor(idComprador, idVendedor);
    }
    @Override
    public List<Chats> findByComprador(int idComprador) {
        return myRepository.findByComprador(idComprador);
    }
}
