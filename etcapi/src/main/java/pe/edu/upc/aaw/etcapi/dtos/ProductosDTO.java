package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ProductosDTO {
    
    private int idProductos;
    private Long precio;
private String imagen;
private int stock;
private Categorias categoria;
private Vendedores vendedor;
private Caracteristicas caracteristica;

    public int getIdProductos() {
        return idProductos;
    }

    public void setIdProductos(int idProductos) {
        this.idProductos = idProductos;
    }

    public Long getPrecio() {
    return precio;
}

public void setPrecio(Long precio) {
    this.precio = precio;
}

public String getImagen() {
    return imagen;
}

public void setImagen(String imagen) {
    this.imagen = imagen;
}

public int getStock() {
    return stock;
}

public void setStock(int stock) {
    this.stock = stock;
}

public Categorias getCategoria() {
    return categoria;
}

public void setCategoria(Categorias categoria) {
    this.categoria = categoria;
}

public Vendedores getVendedor() {
    return vendedor;
}

public void setVendedor(Vendedores vendedor) {
    this.vendedor = vendedor;
}

public Caracteristicas getCaracteristica() {
    return caracteristica;
}

public void setCaracteristica(Caracteristicas caracteristica) {
    this.caracteristica = caracteristica;
}
}
