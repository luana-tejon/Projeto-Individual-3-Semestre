package school.sptech.Alem_da_Rota.destino;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class Destino {

    private Long id;

    @NotBlank(message = "O nome é obrigatório") // não pode ser vazio
    @Size(max = 100)// tamanho
    private String nome;

    @NotBlank(message = "A cidade é obrigatória")// não pode ser vazio
    @Size(max = 80)// tamanho
    private String cidade;

    @NotBlank(message = "O estado é obrigatório")// não pode ser vazio
    @Size(min = 2, max = 2, message = "Use a sigla do estado com duas letras")
    private String estado;

    @NotBlank(message = "A categoria é obrigatória")// não pode ser vazio
    private String categoria;

    @NotBlank(message = "A melhor época é obrigatória")// não pode ser vazio
    private String melhorEpoca;

    @NotNull(message = "O valor médio é obrigatório")// não pode ser vazio
    @DecimalMin(value = "0.0", inclusive = true, message = "O valor não pode ser negativo")
    private BigDecimal valorMedio;

    @NotBlank(message = "A descrição é obrigatória")// não pode ser vazio
    @Size(max = 500) // tamanho
    private String descricao;


    public Destino() {
    }

    public Destino(Long id, String nome, String cidade, String estado,
                   String categoria, String melhorEpoca,
                   BigDecimal valorMedio, String descricao) {
        this.id = id;
        this.nome = nome;
        this.cidade = cidade;
        this.estado = estado;
        this.categoria = categoria;
        this.melhorEpoca = melhorEpoca;
        this.valorMedio = valorMedio;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getMelhorEpoca() {
        return melhorEpoca;
    }

    public void setMelhorEpoca(String melhorEpoca) {
        this.melhorEpoca = melhorEpoca;
    }

    public BigDecimal getValorMedio() {
        return valorMedio;
    }

    public void setValorMedio(BigDecimal valorMedio) {
        this.valorMedio = valorMedio;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Destino{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cidade='" + cidade + '\'' +
                ", estado='" + estado + '\'' +
                ", categoria='" + categoria + '\'' +
                ", melhorEpoca='" + melhorEpoca + '\'' +
                ", valorMedio=" + valorMedio +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}
