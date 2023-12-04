package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.ServiciosDTO;
import pe.edu.upc.aaw.etcapi.entities.Servicios;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IServiciosService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/servicios")
public class ServiciosController {
    @Autowired
    private IServiciosService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody ServiciosDTO dto) {
        ModelMapper m = new ModelMapper();
        Servicios myItem = m.map(dto, Servicios.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public ServiciosDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        ServiciosDTO myItem = m.map(myService.listId(id), ServiciosDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<ServiciosDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ServiciosDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody ServiciosDTO dto) {
        ModelMapper m = new ModelMapper();
        Servicios d = m.map(dto, Servicios.class);
        myService.insert(d);
    }
}
