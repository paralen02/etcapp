package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.EnviosDTO;
import pe.edu.upc.aaw.etcapi.entities.Envios;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IEnviosService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/envios")
public class EnviosController {
    @Autowired
    private IEnviosService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody EnviosDTO dto) {
        ModelMapper m = new ModelMapper();
        Envios myItem = m.map(dto, Envios.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public EnviosDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        EnviosDTO myItem = m.map(myService.listId(id), EnviosDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<EnviosDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, EnviosDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody EnviosDTO dto) {
        ModelMapper m = new ModelMapper();
        Envios d = m.map(dto, Envios.class);
        myService.insert(d);
    }
}
