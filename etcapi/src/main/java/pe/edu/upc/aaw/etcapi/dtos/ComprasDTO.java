package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ComprasDTO {
    
    private int idCompras;
    private LocalDateTime fecha;
private Operaciones operacion;
private Publicaciones publicacion;
private Compradores comprador;
private Envios envio;

    public int getIdCompras() {
        return idCompras;
    }

    public void setIdCompras(int idCompras) {
        this.idCompras = idCompras;
    }

    public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Operaciones getOperacion() {
    return operacion;
}

public void setOperacion(Operaciones operacion) {
    this.operacion = operacion;
}

public Publicaciones getPublicacion() {
    return publicacion;
}

public void setPublicacion(Publicaciones publicacion) {
    this.publicacion = publicacion;
}

public Compradores getComprador() {
    return comprador;
}

public void setComprador(Compradores comprador) {
    this.comprador = comprador;
}

public Envios getEnvio() {
    return envio;
}

public void setEnvio(Envios envio) {
    this.envio = envio;
}
}
