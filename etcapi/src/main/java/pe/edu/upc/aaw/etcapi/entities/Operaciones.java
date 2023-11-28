package pe.edu.upc.aaw.etcapi.entities;

import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Operaciones")
public class Operaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOperaciones;
    @Column(name = "monto")
    private Long monto;

    @Column(name = "fecha")
    private LocalDateTime fecha;


    @ManyToOne
    @JoinColumn(name = "pago_id")
    private Pagos pago;


    public Operaciones() {
    }

    public Operaciones(int idOperaciones, Long monto, LocalDateTime fecha, Pagos pago) {
        this.idOperaciones = idOperaciones;
        this.monto = monto;
        this.fecha = fecha;
        this.pago = pago;
    }

    public int getIdOperaciones() {
        return idOperaciones;
    }

    public void setIdOperaciones(int idOperaciones) {
        this.idOperaciones = idOperaciones;
    }

    public Long getMonto() {
        return monto;
    }

    public void setMonto(Long monto) {
        this.monto = monto;
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
