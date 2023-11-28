package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.PagosDTO;
import pe.edu.upc.aaw.etcapi.entities.Pagos;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IPagosService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pagos")
public class PagosController {
    @Autowired
    private IPagosService myService;

    // Add an item to table
    @PostMapping
    public Pagos registrar(@RequestBody PagosDTO dto) {
        ModelMapper m = new ModelMapper();
        Pagos myItem = m.map(dto, Pagos.class);
        myService.insert(myItem);
        return myItem;
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public PagosDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        PagosDTO myItem = m.map(myService.listId(id), PagosDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<PagosDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PagosDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody PagosDTO dto) {
        ModelMapper m = new ModelMapper();
        Pagos d = m.map(dto, Pagos.class);
        myService.insert(d);
    }
}
