package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "DESPESA")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DESPESA")
    private Long id_Despesa;

    @Column(name = "ID_USUARIO")
    private Long id_Usuario;

    @Column(name = "ID_CONTA")
    private Long id_Conta;

    @Column(name = "ID_CATEGORIA_DESPESA")
    private Long id_CategoriaDespesa;

    @Column(name = "VALOR")
    private Double valor;

    @Column(name = "DATA")
    private LocalDate data;

    @Column(name = "DESCRICAO")
    private String descricao;
}