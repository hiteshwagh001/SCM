package com.scm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.scm")
public class StudentContactManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentContactManagerApplication.class, args);
	}

}
