package com.aakash.todoapp.models;

import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "todo_items")
public class TodoItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String description;

    private Boolean isComplete;

    private Instant createdAt;

    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

   // Getters and Setters
   public Long getId() { return id; }
   public void setId(Long id) { this.id = id; }
   public String getDescription() { return description; }
   public void setDescription(String description) { this.description = description; }
   public Boolean getIsComplete() { return isComplete; }
   public void setIsComplete(Boolean isComplete) { this.isComplete = isComplete; }
   public Instant getCreatedAt() { return createdAt; }
   public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
   public Instant getUpdatedAt() { return updatedAt; }
   public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
   public User getUser() { return user; }
   public void setUser(User user) { this.user = user; }

    @Override
    public String toString() {
        return String.format("TodoItem{id=%d, description='%s', isComplete='%s', createdAt='%s', updatedAt='%s'}",
                id, description, isComplete, createdAt, updatedAt);
    }
}
