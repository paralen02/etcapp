package pe.edu.upc.aaw.etcapi.entities;
import javax.persistence.*;
import java.time.*;

@Entity
@Table(name = "Caracteristicas")
public class Caracteristicas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCaracteristicas;

    @Column(name = "color")
private String color;
@Column(name = "descripcion")
private String descripcion;
@Column(name = "dimensiones")
private String dimensiones;
@Column(name = "material")
private String material;
@Column(name = "meses_uso")
private int meses_uso;

    

    public Caracteristicas() { }

    public Caracteristicas(int idCaracteristicas, String color, String descripcion, String dimensiones, String material, int meses_uso) {
        this.idCaracteristicas = idCaracteristicas;
        this.color = color;
this.descripcion = descripcion;
this.dimensiones = dimensiones;
this.material = material;
this.meses_uso = meses_uso;
    }

    public int getIdCaracteristicas() {
        return idCaracteristicas;
    }

    public String getColor() {
    return color;
}

public void setColor(String color) {
    this.color = color;
}

public String getDescripcion() {
    return descripcion;
}

public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
}

public String getDimensiones() {
    return dimensiones;
}

public void setDimensiones(String dimensiones) {
    this.dimensiones = dimensiones;
}

public String getMaterial() {
    return material;
}

public void setMaterial(String material) {
    this.material = material;
}

public int getMeses_uso() {
    return meses_uso;
}

public void setMeses_uso(int meses_uso) {
    this.meses_uso = meses_uso;
}
}
