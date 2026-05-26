package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Investimento;
import br.com.fiap.fintech.repository.InvestimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository repository;

    // Listar todos os investimentos
    public List<Investimento> listarTodos() {
        return repository.findAll();
    }

    // Buscar um investimento por ID
    public Optional<Investimento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Salvar ou Criar um novo investimento
    public Investimento salvar(Investimento investimento) {
        // Regra de negócio simples para validação
        if (investimento.getValor() == null || investimento.getValor() <= 0) {
            throw new IllegalArgumentException("O valor do investimento deve ser maior que zero!");
        }
        return repository.save(investimento);
    }

    // Deletar investimento por ID
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}