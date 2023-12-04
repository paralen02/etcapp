package pe.edu.upc.aaw.etcapi.serviceimplements;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import pe.edu.upc.aaw.etcapi.dtos.MesesUsoProductosDTO;
import pe.edu.upc.aaw.etcapi.dtos.ProductosPriceDTO;
import pe.edu.upc.aaw.etcapi.dtos.TopDistritosDTO;
import pe.edu.upc.aaw.etcapi.entities.Productos;
import pe.edu.upc.aaw.etcapi.repositories.IProductosRepository;
import pe.edu.upc.aaw.etcapi.serviceinterfaces.IProductosService;

import java.math.BigInteger;
import java.sql.Timestamp;
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
    @Override
    public List<TopDistritosDTO> getTopDistritos() {
        List<Object[]> lista = myRepository.getTopDistritos();
        List<TopDistritosDTO> listaDTO = new ArrayList<>();
        for (Object[] data : lista) {
            TopDistritosDTO dto = new TopDistritosDTO();
            dto.setDistrito((String) data[0]);
            BigInteger bigIntegerTotalVentas = (BigInteger) data[1];
            dto.setTotalVentas(bigIntegerTotalVentas.longValue());
            listaDTO.add(dto);
        }
        return listaDTO;
    }
    @Override
    public List<ProductosPriceDTO> getPricesByCategoryAndMaterial(String categoria, String material) {
        List<Object[]> lista = myRepository.getPricesByCategoryAndMaterial(categoria, material);
        List<ProductosPriceDTO> listaDTO = new ArrayList<>();
        for (Object[] data : lista) {
            ProductosPriceDTO dto = new ProductosPriceDTO();
            dto.setIdProductos((Integer) data[0]);
            dto.setMaterial((String) data[1]);
            dto.setPrecio(((BigInteger) data[2]).doubleValue());
            dto.setTipo((String) data[3]);
            dto.setFecha(((Timestamp) data[4]).toLocalDateTime());
            listaDTO.add(dto);
        }
        return listaDTO;
    }
}
