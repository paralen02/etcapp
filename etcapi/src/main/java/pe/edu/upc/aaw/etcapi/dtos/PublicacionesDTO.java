package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class PublicacionesDTO {
    
    private int idPublicaciones;
    private String titulo;
private String descripcion;
private LocalDateTime fecha;
private Productos producto;

    public int getIdPublicaciones() {
        return idPublicaciones;
    }

    public void setIdPublicaciones(int idPublicaciones) {
        this.idPublicaciones = idPublicaciones;
    }

    public String getTitulo() {
    return titulo;
}

public void setTitulo(String titulo) {
    this.titulo = titulo;
}

public String getDescripcion() {
    return descripcion;
}

public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Productos getProducto() {
    return producto;
}

public void setProducto(Productos producto) {
    this.producto = producto;
}
}
