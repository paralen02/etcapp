package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.ChatsDTO;
import pe.edu.upc.aaw.etcapi.entities.Chats;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IChatsService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chats")
public class ChatsController {
    @Autowired
    private IChatsService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody ChatsDTO dto) {
        ModelMapper m = new ModelMapper();
        Chats myItem = m.map(dto, Chats.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public ChatsDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        ChatsDTO myItem = m.map(myService.listId(id), ChatsDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<ChatsDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ChatsDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody ChatsDTO dto) {
        ModelMapper m = new ModelMapper();
        Chats d = m.map(dto, Chats.class);
        myService.insert(d);
    }
}
