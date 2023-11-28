package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class PagosDTO {
    
    private int idPagos;
    private String correo;
private int cvv;
private String numero_tarjeta;
private LocalDate vencimiento_tarjeta;
private String titular;

    public int getIdPagos() {
        return idPagos;
    }

    public void setIdPagos(int idPagos) {
        this.idPagos = idPagos;
    }

    public String getCorreo() {
    return correo;
}

public void setCorreo(String correo) {
    this.correo = correo;
}

public int getCvv() {
    return cvv;
}

public void setCvv(int cvv) {
    this.cvv = cvv;
}

public String getNumero_tarjeta() {
    return numero_tarjeta;
}

public void setNumero_tarjeta(String numero_tarjeta) {
    this.numero_tarjeta = numero_tarjeta;
}

public LocalDate getVencimiento_tarjeta() {
    return vencimiento_tarjeta;
}

public void setVencimiento_tarjeta(LocalDate vencimiento_tarjeta) {
    this.vencimiento_tarjeta = vencimiento_tarjeta;
}

public String getTitular() {
    return titular;
}

public void setTitular(String titular) {
    this.titular = titular;
}
}
