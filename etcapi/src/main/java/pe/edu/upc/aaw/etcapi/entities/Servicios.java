package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Servicios")
public class Servicios {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idServicios;

    @Column(name = "direccion")
private String direccion;
@Column(name = "fecha")
private LocalDateTime fecha;

    
@ManyToOne
@JoinColumn(name = "operacion_id")
private Operaciones operacion;

@ManyToOne
@JoinColumn(name = "vendedor_id")
private Vendedores vendedor;


    public Servicios() { }

    public Servicios(int idServicios, String direccion, LocalDateTime fecha, Operaciones operacion, Vendedores vendedor) {
        this.idServicios = idServicios;
        this.direccion = direccion;
this.fecha = fecha;
this.operacion = operacion;
this.vendedor = vendedor;
    }

    public int getIdServicios() {
        return idServicios;
    }

    public void setIdServicios(int Servicios) {
        this.idServicios = Servicios;
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
