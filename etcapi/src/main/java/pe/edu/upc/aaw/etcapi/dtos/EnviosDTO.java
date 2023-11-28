package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class EnviosDTO {
    
    private int idEnvios;
    private boolean entregado;
private LocalDate fecha_envio;
private LocalDate fecha_compra;
private String departamento;
private String provincia;
private String distrito;
private String direccion;
private String referencia;
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

public LocalDate getFecha_envio() {
    return fecha_envio;
}

public void setFecha_envio(LocalDate fecha_envio) {
    this.fecha_envio = fecha_envio;
}

public LocalDate getFecha_compra() {
    return fecha_compra;
}

public void setFecha_compra(LocalDate fecha_compra) {
    this.fecha_compra = fecha_compra;
}

public String getDepartamento() {
    return departamento;
}

public void setDepartamento(String departamento) {
    this.departamento = departamento;
}

public String getProvincia() {
    return provincia;
}

public void setProvincia(String provincia) {
    this.provincia = provincia;
}

public String getDistrito() {
    return distrito;
}

public void setDistrito(String distrito) {
    this.distrito = distrito;
}

public String getDireccion() {
    return direccion;
}

public void setDireccion(String direccion) {
    this.direccion = direccion;
}

public String getReferencia() {
    return referencia;
}

public void setReferencia(String referencia) {
    this.referencia = referencia;
}

public Repartidores getRepartidor() {
    return repartidor;
}

public void setRepartidor(Repartidores repartidor) {
    this.repartidor = repartidor;
}
}
