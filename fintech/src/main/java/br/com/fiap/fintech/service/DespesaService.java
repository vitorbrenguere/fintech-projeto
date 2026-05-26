package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Despesa;
import br.com.fiap.fintech.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository repository;

    // Listar todas as despesas
    public List<Despesa> listarTodas() {
        return repository.findAll();
    }

    // Buscar uma despesa por ID
    public Optional<Despesa> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Salvar ou Criar uma nova despesa
    public Despesa salvar(Despesa despesa) {
        if (despesa.getValor() == null || despesa.getValor() <= 0) {
            throw new IllegalArgumentException("O valor da despesa deve ser maior que zero!");
        }
        return repository.save(despesa);
    }

    // Deletar despesa por ID
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}