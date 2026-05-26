package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Despesa;
import br.com.fiap.fintech.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService service;

    @GetMapping
    public List<Despesa> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Despesa> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(despesa -> ResponseEntity.ok().body(despesa))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Despesa criar(@RequestBody Despesa despesa) {
        return service.salvar(despesa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(despesa -> {
                    service.deletar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Atualizar despesa existente (PUT: http://localhost:8081/api/despesas/{id})
    @PutMapping("/{id}")
    public ResponseEntity<Despesa> atualizar(@PathVariable Long id, @RequestBody Despesa despesaAtualizada) {
        return service.buscarPorId(id)
                .map(despesaExistente -> {
                    despesaAtualizada.setId_Despesa(id); // Alterado para 'd' minúsculo
                    Despesa salva = service.salvar(despesaAtualizada);
                    return ResponseEntity.ok().body(salva);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}