package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
    // Só de herdar o JpaRepository, o Spring já cria para você os métodos:
    // save(), findAll(), findById(), deleteById() automaticamente!
}