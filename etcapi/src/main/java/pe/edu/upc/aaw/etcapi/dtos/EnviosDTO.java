package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class EnviosDTO {
    
    private int idEnvios;
    private boolean entregado;
private LocalDate fecha;
private Repartidores repartidor;

    public int getIdEnvios() {
        return idEnvios;
    }

    public void setIdEnvios(int idEnvios) {
        this.idEnvios = idEnvios;
    }

    public boolean getEntregado() {
    return entregado;
}

public void setEntregado(boolean entregado) {
    this.entregado = entregado;
}

public LocalDate getFecha() {
    return fecha;
}

public void setFecha(LocalDate fecha) {
    this.fecha = fecha;
}

public Repartidores getRepartidor() {
    return repartidor;
}

public void setRepartidor(Repartidores repartidor) {
    this.repartidor = repartidor;
}
}
