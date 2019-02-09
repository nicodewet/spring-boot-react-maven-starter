package com.thorgil.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        this.repository.save(new Employee("Frodo", "Baggins", "ring bearer"));
        this.repository.save(new Employee("Mike", "Smith", "cheese taster"));
        this.repository.save(new Employee("Yoko", "Mono", "hunter"));
        this.repository.save(new Employee("Face", "Palm", "grim reaper"));
        this.repository.save(new Employee("Ken", "Kaniff", "programmer"));

    }
}
