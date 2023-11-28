package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Compradores")
public class Compradores {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCompradores;

    @Column(name = "nombres")
private String nombres;
@Column(name = "apellidos")
private String apellidos;
@Column(name = "celular")
private String celular;
@Column(name = "dni")
private String dni;

    
@ManyToOne
@JoinColumn(name = "user_id")
private Users user;


    public Compradores() { }

    public Compradores(int idCompradores, String nombres, String apellidos, String celular, String dni, Users user) {
        this.idCompradores = idCompradores;
        this.nombres = nombres;
this.apellidos = apellidos;
this.celular = celular;
this.dni = dni;
this.user = user;
    }

    public int getIdCompradores() {
        return idCompradores;
    }

    public void setIdCompradores(int idCompradores) {
        this.idCompradores = idCompradores;
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

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
