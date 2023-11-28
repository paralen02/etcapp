package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.CompradoresDTO;
import pe.edu.upc.aaw.etcapi.entities.Compradores;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICompradoresService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/compradores")
public class CompradoresController {
    @Autowired
    private ICompradoresService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody CompradoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Compradores myItem = m.map(dto, Compradores.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public CompradoresDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        CompradoresDTO myItem = m.map(myService.listId(id), CompradoresDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<CompradoresDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, CompradoresDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody CompradoresDTO dto) {
        ModelMapper m = new ModelMapper();
        Compradores d = m.map(dto, Compradores.class);
        myService.insert(d);
    }
    @GetMapping("/buscar/{username}")
    public CompradoresDTO findByUsername(@PathVariable("username") String username) {
        ModelMapper m = new ModelMapper();
        CompradoresDTO myItem = m.map(myService.findByUsername(username), CompradoresDTO.class);
        return myItem;
    }
}
