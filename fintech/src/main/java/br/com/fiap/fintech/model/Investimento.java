package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "INVESTIMENTO")
@Data // Gera automaticamente Getters, Setters, toString, equals e hashCode
@NoArgsConstructor // Gera o construtor vazio obrigatório do JPA
@AllArgsConstructor // Gera o construtor com todos os atributos


public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_INVESTIMENTO")
    private Long id_Investimento;

    @Column(name = "ID_USUARIO")
    private Long id_Usuario;

    @Column(name = "ID_CONTA")
    private Long id_Conta;

    @Column(name = "ID_TIPOINVESTIMENTO")
    private Long id_TipoInvestimento;

    @Column(name = "VALOR")
    private Double valor;

    @Column(name = "DATA_APLICACAO")
    private LocalDate dataAplicacao;

    @Column(name = "CATEGORIA_INVESTIMENTO")
    private String categoriaInvestimento;
}