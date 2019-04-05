package com.example.demo.repository;

import com.example.demo.entity.Nametype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface NametypeRepository extends JpaRepository<Nametype,Long> {
}
