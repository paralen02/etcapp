package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Repartidores")
public class Repartidores {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRepartidores;

    @Column(name = "nombres")
private String nombres;
@Column(name = "apellidos")
private String apellidos;
@Column(name = "dni")
private String dni;
@Column(name = "celular")
private String celular;

    

    public Repartidores() { }

    public Repartidores(int idRepartidores, String nombres, String apellidos, String dni, String celular) {
        this.idRepartidores = idRepartidores;
        this.nombres = nombres;
this.apellidos = apellidos;
this.dni = dni;
this.celular = celular;
    }

    public int getIdRepartidores() {
        return idRepartidores;
    }

    public void setIdRepartidores(int idRepartidores) {
        this.idRepartidores = idRepartidores;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }
}
