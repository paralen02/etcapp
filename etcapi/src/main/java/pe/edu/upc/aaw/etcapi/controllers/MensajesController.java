package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.MensajesDTO;
import pe.edu.upc.aaw.etcapi.entities.Mensajes;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IMensajesService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mensajes")
public class MensajesController {
    @Autowired
    private IMensajesService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody MensajesDTO dto) {
        ModelMapper m = new ModelMapper();
        Mensajes myItem = m.map(dto, Mensajes.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public MensajesDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        MensajesDTO myItem = m.map(myService.listId(id), MensajesDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<MensajesDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, MensajesDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody MensajesDTO dto) {
        ModelMapper m = new ModelMapper();
        Mensajes d = m.map(dto, Mensajes.class);
        myService.insert(d);
    }
    @GetMapping("/chat/{idChat}")
    public List<MensajesDTO> findByChat(@PathVariable("idChat") int idChat) {
        return myService.findByChat(idChat).stream().map(mensaje -> {
            ModelMapper m = new ModelMapper();
            return m.map(mensaje, MensajesDTO.class);
        }).collect(Collectors.toList());
    }
}
