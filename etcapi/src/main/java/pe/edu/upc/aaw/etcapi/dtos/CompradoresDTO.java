package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class CompradoresDTO {
    
    private int idCompradores;
    private String nombres;
private String apellidos;
private String celular;
private String dni;
private Users user;

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
