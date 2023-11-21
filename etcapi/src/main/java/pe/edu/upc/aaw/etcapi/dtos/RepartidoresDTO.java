package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class RepartidoresDTO {
    
    private int idRepartidores;
    private String nombres;
private String apellidos;
private String dni;
private String celular;

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
