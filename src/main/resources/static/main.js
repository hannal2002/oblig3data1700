//Utskrift av billett
let utMeldingFilm = "";
let utMeldingAntall = "";
let utMeldingFornavn = "";
let utMeldingEtternavn = "";
let utMeldingEpost = "";
let utMeldingTelefonnr = "";

function inputValidering(){

    $("#feilAntall").html("");
    $("#feilFilm").html("");
    $("#feilFornavn").html("");
    $("#feilEtternavn").html("");
    $("#feilTelefonnr").html("");
    $("#feilEpost").html("");

    //Variabler for input og valideringer.
    let filmInput = $("#filmer").val();
    let antallInput = $("#antall").val();
    let fornavnInput = $("#fornavn").val();
    let etternavnInput = $("#etternavn").val();
    let telefonnrInput = $("#telefonnr").val();
    let epostInput = $("#epost").val();

    const valideringNavn = /^[a-zA-Z]+$/;
    const valideringEpost = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const valideringTelefonnr = /^((0047)?|(\+47)?)[4|9]\d{7}$/;


    if (filmInput === "velgFilm"){
        utMeldingFilm = "feil";
        $("#feilFilm").html("Vennligst velg en film!")
    } else {
        utMeldingFilm = $("#filmer").val();
    }

    if (antallInput >= 1){
        utMeldingAntall =$("#antall").val();
    } else {
        utMeldingAntall = "feil";
        $("#feilAntall").html("Vennligst velg et antall!")
    }

    if (valideringNavn.test(fornavnInput)){
        utMeldingFornavn = $("#fornavn").val();
    } else {
        utMeldingFornavn = "feil";
        $("#feilFornavn").html("Skriv inn et fornavn!");
    }

    if (valideringNavn.test(etternavnInput)){
        utMeldingEtternavn = $("#etternavn").val();
    } else {
        utMeldingEtternavn= "feil";
        $("#feilEtternavn").html("Skriv inn et etternavn!");
    }

    if (valideringTelefonnr.test(telefonnrInput)){
        utMeldingTelefonnr = $("#telefonnr").val();
    } else {
        utMeldingTelefonnr = "feil";
        $("#feilTelefonnr").html("Skriv inn et gyldig telefonnr!");
    }

    if (valideringEpost.test(epostInput)){
        utMeldingEpost = $("#epost").val();
    } else {
        utMeldingEpost = "feil";
        $("#feilEpost").html("Skriv inn en gyldig epostadresse!");
    }
}

function kjopBillett(){
    const billett = {
        film: utMeldingFilm,
        antall: utMeldingAntall,
        fornavn: utMeldingFornavn,
        etternavn: utMeldingEtternavn,
        epost: utMeldingEpost,
        telefonnr: utMeldingTelefonnr
    };

    //Dataene fra input-boksene blir lagret i et array om alt er godkjent.
    if (utMeldingFilm !== "feil" && utMeldingAntall !== "feil" && utMeldingFornavn !== "feil" && utMeldingEtternavn !== "feil" && utMeldingTelefonnr !== "feil" && utMeldingEpost !== "feil" ){
        $.post("/lagre", billett, function (){
            hentAlle(); //Oppdatere listen over billetter
        });
    }
    $("#film").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#epost").val("");
    $("#telefonnr").val("");
}

function hentAlle(){
    $.get("/hentAlle", function (data){
        formaterData(data);
    });
}

function formaterData(billetter){
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Epost</th><th>Nummer</th></tr>";
    for (const x of billetter){
        ut+= "<tr><td>"+x.film+"</td><td>"+x.antall+"</td><td>"+x.fornavn+"</td><td>"+x.etternavn+"</td><td>"+x.epost+"</td><td>"+x.telefonnr+"</td></tr>";
    }
    ut+="</table>";
    $("#output").html(ut);
}

//Sletter billettene i arrayet.
function slettBilletter() {
    $.get("/slettAlle", function (){
        hentAlle()
    })

    //Div-en med id = output blir blank
    $("#output").HTML = "";

    //Sletter valideringsfeilmeldinger.
    $("#feilFilm").HTML = "";
    $("#feilAntall").HTML = "";
    $("#feilFornavn").HTML = "";
    $("#feilEtternavn").HTML = "";
    $("#feilTelefonnr").HTML= "";
    $("#feilEpost").HTML= "";
}

