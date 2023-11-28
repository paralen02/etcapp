package pe.edu.upc.aaw.etcapi.serviceimplements;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.dtos.MesesUsoProductosDTO;
import pe.edu.upc.aaw.etcapi.entities.Productos;
import pe.edu.upc.aaw.etcapi.repositories.IProductosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IProductosService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductosServiceImplement implements IProductosService {
    @Autowired
    private IProductosRepository myRepository;

    // Add an item to table
    @Override
    public void insert(Productos Productos) {
        myRepository.save(Productos);
    }

    // Delete an item by ID on table
    @Override
    public void delete(int idProductos) {
        myRepository.deleteById(idProductos);
    }

    // Retrieve an items by ID from table
    @Override
    public Productos listId(int idProductos) {
        return myRepository.findById(idProductos).orElse(new Productos());
    }

    // Retrieve all items from table
    @Override
    public List<Productos> list() {
        return myRepository.findAll();
    }

    @Override
    public void update(Productos Productos) {
        myRepository.save(Productos);
    }
    @Override
    public List<MesesUsoProductosDTO> getMesesUso() {
        List<Object[]> lista = myRepository.getMesesUso();
        List<MesesUsoProductosDTO> listaDTO = new ArrayList<>();
        for (Object[] data : lista) {
            MesesUsoProductosDTO dto = new MesesUsoProductosDTO();
            dto.setIdProductos((Integer) data[0]);
            dto.setMeses_uso((Integer) data[1]);
            listaDTO.add(dto);
        }
        return listaDTO;
    }
}
