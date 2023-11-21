package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.ProductosDTO;
import pe.edu.upc.aaw.etcapi.entities.Productos;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IProductosService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/productos")
public class ProductosController {
    @Autowired
    private IProductosService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody ProductosDTO dto) {
        ModelMapper m = new ModelMapper();
        Productos myItem = m.map(dto, Productos.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public ProductosDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        ProductosDTO myItem = m.map(myService.listId(id), ProductosDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<ProductosDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ProductosDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody ProductosDTO dto) {
        ModelMapper m = new ModelMapper();
        Productos d = m.map(dto, Productos.class);
        myService.insert(d);
    }
}
