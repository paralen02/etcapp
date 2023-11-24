package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Productos")
public class Productos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProductos;

    @Column(name = "precio")
private Long precio;
@Column(name = "imagen")
private String imagen;
@Column(name = "stock")
private int stock;

    
@ManyToOne
@JoinColumn(name = "categoria_id")
private Categorias categoria;

@ManyToOne
@JoinColumn(name = "vendedor_id")
private Vendedores vendedor;

@ManyToOne
@JoinColumn(name = "caracteristica_id")
private Caracteristicas caracteristica;


    public Productos() { }

    public Productos(int idProductos, Long precio, String imagen, int stock, Categorias categoria, Vendedores vendedor, Caracteristicas caracteristica) {
        this.idProductos = idProductos;
        this.precio = precio;
this.imagen = imagen;
this.stock = stock;
this.categoria = categoria;
this.vendedor = vendedor;
this.caracteristica = caracteristica;
    }

    public int getIdProductos() {
        return idProductos;
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
