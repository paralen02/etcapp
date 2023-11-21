package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.VendedoresDTO;
import pe.edu.upc.aaw.etcapi.entities.Vendedores;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IVendedoresService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vendedores")
public class VendedoresController {
    @Autowired
    private IVendedoresService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody VendedoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Vendedores myItem = m.map(dto, Vendedores.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public VendedoresDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        VendedoresDTO myItem = m.map(myService.listId(id), VendedoresDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<VendedoresDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, VendedoresDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody VendedoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Vendedores d = m.map(dto, Vendedores.class);
        myService.insert(d);
    }
}
