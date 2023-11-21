package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Pagos")
public class Pagos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPagos;

    @Column(name = "correo")
private String correo;
@Column(name = "cvv")
private int cvv;
@Column(name = "numero_tarjeta")
private String numero_tarjeta;
@Column(name = "vencimiento_tarjeta")
private LocalDate vencimiento_tarjeta;
@Column(name = "titular")
private int titular;

    

    public Pagos() { }

    public Pagos(int idPagos, String correo, int cvv, String numero_tarjeta, LocalDate vencimiento_tarjeta, int titular) {
        this.idPagos = idPagos;
        this.correo = correo;
this.cvv = cvv;
this.numero_tarjeta = numero_tarjeta;
this.vencimiento_tarjeta = vencimiento_tarjeta;
this.titular = titular;
    }

    public int getIdPagos() {
        return idPagos;
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

public int getTitular() {
    return titular;
}

public void setTitular(int titular) {
    this.titular = titular;
}
}
