package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Vendedores")
public class Vendedores {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVendedores;

    @Column(name = "direccion")
private String direccion;
@Column(name = "distrito")
private String distrito;

    
@ManyToOne
@JoinColumn(name = "user_id")
private Users user;


    public Vendedores() { }

    public Vendedores(int idVendedores, String direccion, String distrito, Users user) {
        this.idVendedores = idVendedores;
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
