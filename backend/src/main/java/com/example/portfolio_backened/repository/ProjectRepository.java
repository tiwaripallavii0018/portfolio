package com.example.portfolio_backened.repository;

import com.example.portfolio_backened.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}