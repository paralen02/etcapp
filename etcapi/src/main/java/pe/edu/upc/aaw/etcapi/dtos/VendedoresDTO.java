package pe.edu.upc.aaw.etcapi.dtos;
import javax.persistence.*;
import pe.edu.upc.aaw.etcapi.entities.*;
import java.time.*;

public class VendedoresDTO {
    
    private int idVendedores;
    private String direccion;
private String distrito;
private Users user;

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
