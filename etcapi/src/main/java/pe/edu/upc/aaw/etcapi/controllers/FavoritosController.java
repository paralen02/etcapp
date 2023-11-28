package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.FavoritosDTO;
import pe.edu.upc.aaw.etcapi.entities.Favoritos;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IFavoritosService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/favoritos")
public class FavoritosController {
    @Autowired
    private IFavoritosService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody FavoritosDTO dto) {
        ModelMapper m = new ModelMapper();
        Favoritos myItem = m.map(dto, Favoritos.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/comprador/{idCompradores}/publicacion/{idPublicaciones}")
    public void eliminar(@PathVariable("idCompradores") Integer idCompradores, @PathVariable("idPublicaciones") Integer idPublicaciones){
        myService.delete(idCompradores, idPublicaciones);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public FavoritosDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        FavoritosDTO myItem = m.map(myService.listId(id), FavoritosDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<FavoritosDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, FavoritosDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody FavoritosDTO dto) {
        ModelMapper m = new ModelMapper();
        Favoritos d = m.map(dto, Favoritos.class);
        myService.insert(d);
    }
    @GetMapping("/esFavorito/{idCompradores}/{idPublicaciones}")
    public boolean esFavorito(@PathVariable("idCompradores") Integer idCompradores, @PathVariable("idPublicaciones") Integer idPublicaciones) {
        return myService.esFavorito(idCompradores, idPublicaciones);
    }
}
