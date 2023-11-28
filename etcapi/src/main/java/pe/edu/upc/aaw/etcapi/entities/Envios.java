package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Envios")
public class Envios {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEnvios;

    @Column(name = "entregado")
private boolean entregado;
@Column(name = "fecha_envio")
private LocalDate fecha_envio;
@Column(name = "fecha_compra")
private LocalDate fecha_compra;
@Column(name = "departamento")
private String departamento;
@Column(name = "provincia")
private String provincia;
@Column(name = "distrito")
private String distrito;
@Column(name = "direccion")
private String direccion;
@Column(name = "referencia")
private String referencia;

    
@ManyToOne(optional = true)
@JoinColumn(name = "repartidor_id")
private Repartidores repartidor;


    public Envios() { }

    public Envios(int idEnvios, boolean entregado, LocalDate fecha_envio, LocalDate fecha_compra, String departamento, String provincia, String distrito, String direccion, String referencia, Repartidores repartidor) {
        this.idEnvios = idEnvios;
        this.entregado = entregado;
this.fecha_envio = fecha_envio;
this.fecha_compra = fecha_compra;
this.departamento = departamento;
this.provincia = provincia;
this.distrito = distrito;
this.direccion = direccion;
this.referencia = referencia;
this.repartidor = repartidor;
    }

    public int getIdEnvios() {
        return idEnvios;
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
