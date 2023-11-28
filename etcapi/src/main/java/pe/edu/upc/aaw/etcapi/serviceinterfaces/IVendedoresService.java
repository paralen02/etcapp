package pe.edu.upc.aaw.etcapi.serviceinterfaces;
import pe.edu.upc.aaw.etcapi.entities.Compradores;
import pe.edu.upc.aaw.etcapi.entities.Vendedores;
import java.util.List;

public interface IVendedoresService {
    void insert(Vendedores Vendedores);
    void delete(int id);
    Vendedores listId(int id);
    List<Vendedores> list();
    Vendedores findByUsername(String username);
}