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
@Column(name = "fecha")
private LocalDate fecha;

    
@ManyToOne
@JoinColumn(name = "repartidor_id")
private Repartidores repartidor;


    public Envios() { }

    public Envios(int idEnvios, boolean entregado, LocalDate fecha, Repartidores repartidor) {
        this.idEnvios = idEnvios;
        this.entregado = entregado;
this.fecha = fecha;
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
