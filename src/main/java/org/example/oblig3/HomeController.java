package org.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private BillettRepo rep;

    @PostMapping("/lagre")
    public void kjopBillett(Billett innBillett){
        rep.kjopBillett(innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return rep.hentBillett();
    }

    @GetMapping("/slettAlle")
    public void slettBilletter(){
        rep.slettBilletter();
    }

}
