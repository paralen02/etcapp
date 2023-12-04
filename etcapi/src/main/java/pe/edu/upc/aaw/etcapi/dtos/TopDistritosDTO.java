package pe.edu.upc.aaw.etcapi.dtos;

public class TopDistritosDTO {
    private String distrito;
    private Long totalVentas;

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public Long getTotalVentas() {
        return totalVentas;
    }

    public void setTotalVentas(Long totalVentas) {
        this.totalVentas = totalVentas;
    }
}
