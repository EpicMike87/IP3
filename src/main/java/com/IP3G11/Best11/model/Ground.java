package com.IP3G11.Best11.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="ground")
public class Ground {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String city;
    private String address;
    private String surface;
    private String photoUrl;
    private int capacity;

    public Ground(int id, String groundsName, String city, String address, String surface, String photoUrl, int capacity) {
        this.id = id;
        name = groundsName;
        this.city = city;
        this.address = address;
        this.surface = surface;
        this.photoUrl = photoUrl;
        this.capacity = capacity;
    }
}