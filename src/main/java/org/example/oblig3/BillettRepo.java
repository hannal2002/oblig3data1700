package org.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepo {

    @Autowired
    private JdbcTemplate db;

    public void kjopBillett(Billett innBillett){
        String sql = "INSERT INTO BILLETT (fornavn, etternavn, epost, telefonnr, antall, film) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql,innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getEpost(), innBillett.getTelefonnr(), innBillett.getAntall(), innBillett.getFilm());
    }

    public List<Billett> hentBillett(){
        String sql = "SELECT * FROM BILLETT ORDER BY etternavn";
        return db.query(sql, new BeanPropertyRowMapper(Billett.class));
    }

    public void slettBilletter(){
        String sql = "DELETE FROM BILLETT";
        db.update(sql);
    }
}
