package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.ComprasDTO;
import pe.edu.upc.aaw.etcapi.entities.Compras;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IComprasService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/compras")
public class ComprasController {
    @Autowired
    private IComprasService myService;

    // Add an item to table
    @PostMapping
    public Compras registrar(@RequestBody ComprasDTO dto) {
        ModelMapper m = new ModelMapper();
        Compras myItem = m.map(dto, Compras.class);
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
    public ComprasDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        ComprasDTO myItem = m.map(myService.listId(id), ComprasDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<ComprasDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ComprasDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody ComprasDTO dto) {
        ModelMapper m = new ModelMapper();
        Compras d = m.map(dto, Compras.class);
        myService.insert(d);
    }
}
