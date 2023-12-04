package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Vendedores")
public class Vendedores {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVendedores;
    @Column(name = "nombres")
    private String nombres;
    @Column(name = "apellidos")
    private String apellidos;
    @Column(name = "celular")
    private String celular;
    @Column(name = "dni")
    private String dni;
    @Column(name = "direccion")
private String direccion;
@Column(name = "distrito")
private String distrito;

    
@ManyToOne
@JoinColumn(name = "user_id")
private Users user;


    public Vendedores() { }

    public Vendedores(int idVendedores, String nombres, String apellidos, String celular, String dni, String direccion, String distrito, Users user) {
        this.idVendedores = idVendedores;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.celular = celular;
        this.dni = dni;
        this.direccion = direccion;
        this.distrito = distrito;
        this.user = user;
    }

    public int getIdVendedores() {
        return idVendedores;
    }

    public void setIdVendedores(int idVendedores) {
        this.idVendedores = idVendedores;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
