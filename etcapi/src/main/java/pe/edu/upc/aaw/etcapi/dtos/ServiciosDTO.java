package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class ServiciosDTO {
    
    private int idServicios;
    private String direccion;
private LocalDateTime fecha;
private Operaciones operacion;
private Vendedores vendedor;

    public int getIdServicios() {
        return idServicios;
    }

    public void setIdServicios(int idServicios) {
        this.idServicios = idServicios;
    }

    public String getDireccion() {
    return direccion;
}

public void setDireccion(String direccion) {
    this.direccion = direccion;
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

public Vendedores getVendedor() {
    return vendedor;
}

public void setVendedor(Vendedores vendedor) {
    this.vendedor = vendedor;
}
}
