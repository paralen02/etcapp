package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class OperacionesDTO {
    
    private int idOperaciones;
    private LocalDateTime fecha;
private Pagos pago;

    public int getIdOperaciones() {
        return idOperaciones;
    }

    public void setIdOperaciones(int idOperaciones) {
        this.idOperaciones = idOperaciones;
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
