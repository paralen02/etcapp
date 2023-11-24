package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Operaciones")
public class Operaciones {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOperaciones;

    @Column(name = "fecha")
private LocalDateTime fecha;

    
@ManyToOne
@JoinColumn(name = "pago_id")
private Pagos pago;


    public Operaciones() { }

    public Operaciones(int idOperaciones, LocalDateTime fecha, Pagos pago) {
        this.idOperaciones = idOperaciones;
        this.fecha = fecha;
this.pago = pago;
    }

    public int getIdOperaciones() {
        return idOperaciones;
    }

    public LocalDateTime getFecha() {
    return fecha;
}

public void setFecha(LocalDateTime fecha) {
    this.fecha = fecha;
}

public Pagos getPago() {
    return pago;
}

public void setPago(Pagos pago) {
    this.pago = pago;
}
}
