package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.OperacionesDTO;
import pe.edu.upc.aaw.etcapi.entities.Operaciones;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IOperacionesService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/operaciones")
public class OperacionesController {
    @Autowired
    private IOperacionesService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody OperacionesDTO dto) {
        ModelMapper m = new ModelMapper();
        Operaciones myItem = m.map(dto, Operaciones.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public OperacionesDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        OperacionesDTO myItem = m.map(myService.listId(id), OperacionesDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<OperacionesDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, OperacionesDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody OperacionesDTO dto) {
        ModelMapper m = new ModelMapper();
        Operaciones d = m.map(dto, Operaciones.class);
        myService.insert(d);
    }
}
