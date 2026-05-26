package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Investimento;
import br.com.fiap.fintech.service.InvestimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/investimentos")
public class InvestimentoController {

    @Autowired
    private InvestimentoService service;

    // 1. Listar todos (GET: http://localhost:8080/api/investimentos)
    @GetMapping
    public List<Investimento> listarTodos() {
        return service.listarTodos();
    }

    // 2. Buscar por ID (GET: http://localhost:8080/api/investimentos/{id})
    @GetMapping("/{id}")
    public ResponseEntity<Investimento> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(investimento -> ResponseEntity.ok().body(investimento))
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Criar novo investimento (POST: http://localhost:8080/api/investimentos)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Investimento criar(@RequestBody Investimento investimento) {
        return service.salvar(investimento);
    }

    // 4. Deletar por ID (DELETE: http://localhost:8080/api/investimentos/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(investimento -> {
                    service.deletar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Atualizar investimento existente (PUT: http://localhost:8081/api/investimentos/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Investimento> atualizar(@PathVariable Long id, @RequestBody Investimento investimentoAtualizado) {
        return service.buscarPorId(id)
                .map(investimentoExistente -> {
                    investimentoAtualizado.setId_Investimento(id); 
                    Investimento salvo = service.salvar(investimentoAtualizado);
                    return ResponseEntity.ok().body(salvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}