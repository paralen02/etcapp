package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ReseniasDTO {
    
    private int idResenias;
    private String comentario;
private int calificacion;
private LocalDateTime fecha;
private Compras compra;

    public int getIdResenias() {
        return idResenias;
    }

    public void setIdResenias(int idResenias) {
        this.idResenias = idResenias;
    }

    public String getComentario() {
    return comentario;
}

public void setComentario(String comentario) {
    this.comentario = comentario;
}

public int getCalificacion() {
    return calificacion;
}

public void setCalificacion(int calificacion) {
    this.calificacion = calificacion;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Compras getCompra() {
    return compra;
}

public void setCompra(Compras compra) {
    this.compra = compra;
}
}
