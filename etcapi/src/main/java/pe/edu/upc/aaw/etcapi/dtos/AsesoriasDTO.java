package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class AsesoriasDTO {
    
    private int idAsesorias;
    private String link;
private LocalDateTime fecha;
private String motivo;
private Compras compra;

    public int getIdAsesorias() {
        return idAsesorias;
    }

    public void setIdAsesorias(int idAsesorias) {
        this.idAsesorias = idAsesorias;
    }

    public String getLink() {
    return link;
}

public void setLink(String link) {
    this.link = link;
}

public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public String getMotivo() {
    return motivo;
}

public void setMotivo(String motivo) {
    this.motivo = motivo;
}

public Compras getCompra() {
    return compra;
}

public void setCompra(Compras compra) {
    this.compra = compra;
}
}
