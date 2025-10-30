package com.demo.infinite_scroll.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
@CrossOrigin(origins = "*")
public class NumberController {

    @GetMapping("/numbers")
    public Map<String, Object> getNumbers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        int start = page * size;
        int end = Math.min(start + size, 100); // simulate 100 numbers total

        List<Integer> numbers = new ArrayList<>();
        for (int i = start; i < end; i++) {
            numbers.add(i + 1);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", numbers);
        response.put("page", page);
        response.put("totalPages", 10);

        return response;
    }
}

