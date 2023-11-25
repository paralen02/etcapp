package pe.edu.upc.aaw.etcapi.controllers;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.aaw.etcapi.dtos.PublicacionesDTO;
import pe.edu.upc.aaw.etcapi.entities.Publicaciones;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IPublicacionesService;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/publicaciones")
public class PublicacionesController {
    @Autowired
    private IPublicacionesService myService;

    // Add an item to table
    @PostMapping
    public void registrar(@RequestBody PublicacionesDTO dto) {
        ModelMapper m = new ModelMapper();
        Publicaciones myItem = m.map(dto, Publicaciones.class);
        myService.insert(myItem);
    }

    // Delete an item by ID on table
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id")Integer id){
        myService.delete(id);
    }

    // Retrieve an items by ID from table
    @GetMapping("/{id}")
    public PublicacionesDTO listarId(@PathVariable("id")Integer id){
        ModelMapper m = new ModelMapper();
        PublicacionesDTO myItem = m.map(myService.listId(id), PublicacionesDTO.class);
        return myItem;
    }

    // Retrieve all items from table
    @GetMapping
    public List<PublicacionesDTO> listar(){
        return myService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PublicacionesDTO.class);
        }).collect(Collectors.toList());
    }

    // (Exclusive to controller) Modify values on table
    @PutMapping
    public void modificar(@RequestBody PublicacionesDTO dto) {
        ModelMapper m = new ModelMapper();
        Publicaciones d = m.map(dto, Publicaciones.class);
        myService.insert(d);
    }

    @GetMapping("/multiple")
    public List<PublicacionesDTO> listarIds(@RequestParam("ids") String ids){
        String[] idsArray = ids.split("&");
        List<Integer> idsList = Arrays.stream(idsArray).map(Integer::parseInt).collect(Collectors.toList());
        return myService.listIds(idsList).stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, PublicacionesDTO.class);
        }).collect(Collectors.toList());
    }
}
