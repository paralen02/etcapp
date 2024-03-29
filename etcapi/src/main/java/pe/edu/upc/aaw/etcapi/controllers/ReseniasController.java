package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.ReseniasDTO;
import pe.edu.upc.aaw.etcapi.entities.Resenias;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IReseniasService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resenias")
public class ReseniasController {
    @Autowired
    private IReseniasService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody ReseniasDTO dto) {
        ModelMapper m = new ModelMapper();
        Resenias myItem = m.map(dto, Resenias.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public ReseniasDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        ReseniasDTO myItem = m.map(myService.listId(id), ReseniasDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<ReseniasDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ReseniasDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody ReseniasDTO dto) {
        ModelMapper m = new ModelMapper();
        Resenias d = m.map(dto, Resenias.class);
        myService.insert(d);
    }
    @GetMapping("/compra/{idCompra}")
    public ReseniasDTO getReseniaByCompra(@PathVariable("idCompra") Integer idCompra) {
        ModelMapper m = new ModelMapper();
        Resenias resenia = myService.findByCompra_IdCompras(idCompra);
        if (resenia == null) {
            return null;
        }
        ReseniasDTO myItem = m.map(resenia, ReseniasDTO.class);
        return myItem;
    }
    @GetMapping("/vendedor/{idVendedor}")
    public List<ReseniasDTO> getReseniasByVendedor(@PathVariable("idVendedor") Integer idVendedor) {
        return myService.findByVendedor_IdVendedores(idVendedor).stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ReseniasDTO.class);
        }).collect(Collectors.toList());
    }
}
