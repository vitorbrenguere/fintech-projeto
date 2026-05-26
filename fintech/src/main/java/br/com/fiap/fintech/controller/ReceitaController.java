package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Receita;
import br.com.fiap.fintech.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    public List<Receita> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(receita -> ResponseEntity.ok().body(receita))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Receita criar(@RequestBody Receita receita) {
        return service.salvar(receita);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(receita -> {
                    service.deletar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Atualizar receita existente (PUT: http://localhost:8081/api/receitas/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receitaAtualizada) {
        return service.buscarPorId(id)
                .map(receitaExistente -> {
                    receitaAtualizada.setId_Receita(id); // Alterado para 'r' minúsculo
                    Receita salva = service.salvar(receitaAtualizada);
                    return ResponseEntity.ok().body(salva);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}