package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.RepartidoresDTO;
import pe.edu.upc.aaw.etcapi.entities.Repartidores;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IRepartidoresService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/repartidores")
public class RepartidoresController {
    @Autowired
    private IRepartidoresService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody RepartidoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Repartidores myItem = m.map(dto, Repartidores.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public RepartidoresDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        RepartidoresDTO myItem = m.map(myService.listId(id), RepartidoresDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<RepartidoresDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RepartidoresDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody RepartidoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Repartidores d = m.map(dto, Repartidores.class);
        myService.insert(d);
    }
}
