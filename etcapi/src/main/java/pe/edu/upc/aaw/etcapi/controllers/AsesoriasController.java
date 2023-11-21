package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.AsesoriasDTO;
import pe.edu.upc.aaw.etcapi.entities.Asesorias;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IAsesoriasService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/asesorias")
public class AsesoriasController {
    @Autowired
    private IAsesoriasService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody AsesoriasDTO dto) {
        ModelMapper m = new ModelMapper();
        Asesorias myItem = m.map(dto, Asesorias.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public AsesoriasDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        AsesoriasDTO myItem = m.map(myService.listId(id), AsesoriasDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<AsesoriasDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, AsesoriasDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody AsesoriasDTO dto) {
        ModelMapper m = new ModelMapper();
        Asesorias d = m.map(dto, Asesorias.class);
        myService.insert(d);
    }
}
