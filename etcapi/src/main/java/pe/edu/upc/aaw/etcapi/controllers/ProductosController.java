package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.MesesUsoProductosDTO;
import pe.edu.upc.aaw.etcapi.dtos.ProductosDTO;
import pe.edu.upc.aaw.etcapi.dtos.ProductosPriceDTO;
import pe.edu.upc.aaw.etcapi.dtos.TopDistritosDTO;
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
    public Productos registrar(@RequestBody ProductosDTO dto) {
        ModelMapper m = new ModelMapper();
        Productos myItem = m.map(dto, Productos.class);
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
    @PutMapping("/{id}")
    public void modificar(@PathVariable("id") Integer id, @RequestBody ProductosDTO dto) {
        ModelMapper m = new ModelMapper();
        Productos d = m.map(dto, Productos.class);
        d.setIdProductos(id); // Asegúrate de que el ID del producto se establece correctamente
        myService.update(d);
    }
    @GetMapping("/meses_uso")
    public List<MesesUsoProductosDTO> getMesesUso() {
        return myService.getMesesUso();
    }

    @GetMapping("/top-distritos")
    public List<TopDistritosDTO> getTopDistritos() {
        return myService.getTopDistritos();
    }
    @GetMapping("/prices")
    public List<ProductosPriceDTO> getPricesByCategoryAndMaterial(
            @RequestParam("category") String category,
            @RequestParam("material") String material) {
        return myService.getPricesByCategoryAndMaterial(category, material);
    }
}
