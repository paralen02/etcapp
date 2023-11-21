package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.CategoriasDTO;
import pe.edu.upc.aaw.etcapi.entities.Categorias;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICategoriasService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categorias")
public class CategoriasController {
    @Autowired
    private ICategoriasService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody CategoriasDTO dto) {
        ModelMapper m = new ModelMapper();
        Categorias myItem = m.map(dto, Categorias.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public CategoriasDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        CategoriasDTO myItem = m.map(myService.listId(id), CategoriasDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<CategoriasDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, CategoriasDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody CategoriasDTO dto) {
        ModelMapper m = new ModelMapper();
        Categorias d = m.map(dto, Categorias.class);
        myService.insert(d);
    }
}
