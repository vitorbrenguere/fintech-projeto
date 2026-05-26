package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository repository;

    // Listar todas as receitas
    public List<Receita> listarTodas() {
        return repository.findAll();
    }

    // Buscar uma receita por ID
    public Optional<Receita> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Salvar ou Criar uma nova receita
    public Receita salvar(Receita receita) {
        if (receita.getValor() == null || receita.getValor() <= 0) {
            throw new IllegalArgumentException("O valor da receita deve ser maior que zero!");
        }
        return repository.save(receita);
    }

    // Deletar receita por ID
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}