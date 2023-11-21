package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.CaracteristicasDTO;
import pe.edu.upc.aaw.etcapi.entities.Caracteristicas;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.ICaracteristicasService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicasController {
    @Autowired
    private ICaracteristicasService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody CaracteristicasDTO dto) {
        ModelMapper m = new ModelMapper();
        Caracteristicas myItem = m.map(dto, Caracteristicas.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public CaracteristicasDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        CaracteristicasDTO myItem = m.map(myService.listId(id), CaracteristicasDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<CaracteristicasDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, CaracteristicasDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody CaracteristicasDTO dto) {
        ModelMapper m = new ModelMapper();
        Caracteristicas d = m.map(dto, Caracteristicas.class);
        myService.insert(d);
    }
}
