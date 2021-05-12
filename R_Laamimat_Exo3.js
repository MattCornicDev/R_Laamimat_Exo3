
//genere un nombre aleatoir entre 1 et 100
let NbMystere = parseInt((Math.random()*100)+1);
//les variables
const envoyer = document.querySelector('#essaiJoueur');
const userInput = document.querySelector('#champ');
const devinage = document.querySelector('.devine');
const restant = document.querySelector('.dernierResultat');
const recommencer = document.querySelector('.resultParas');
const tropBas = document.querySelector('.tropBas');
const p = document.createElement('p');

//valeur precedente
let precedent = [];
//nombre d'essai par joueur
let numdevine = 1;
let jeu = true;

if (jeu){
    essaiJoueur.addEventListener('click', function(e){
        e.preventDefault();
        //Getting the number from user
        const essai = parseInt(userInput.value);
        validerEssai(essai);
    });
}
//quand le joueur entre un num erroné
function validerEssai(essai){
  //vérifie si le nombre est nul
    if (isNaN(essai)){
        alert('Nombre invalide');
    } else if (essai < 1) {
        alert('Enter un nombre plus grand que 1');
    } else if (essai > 500){
        alert('entrer un nombre plus petit que 100')
    } else {
        //registre de nombre de tentative
        //push dans un tableau
        precedent.push(essai);
        //verifie si le jeu est terminé
        if (numdevine === 11){
            afficherdevine(essai);
            var newPara = document.createElement('p');
            newPara.id = "info";
            var texte = document.createTextNode("PERDU ! Le nombre était  " );
            newPara.appendChild(texte);
            document.body.appendChild(newPara);
            afficherMessage(`${NbMystere}`);
            document.querySelector("#info").style.backgroundColor = "red";

            fin();
        } else {
        //afficher essai précédent
        afficherdevine(essai);
        //verifie essai
        verifier(essai);
        }
    }
}

function verifier(essai){
    //afficher si le nombre est plus grand ou plus petit
    if (essai === NbMystere){
         // afficherMessage('Excellent !');
        var excellent = document.createElement('p');
        excellent.id = "excellent";
        var texteExcellent = document.createTextNode("Bravo vous avez trouvé le nombre");
        excellent.appendChild(texteExcellent);
        document.body.appendChild(excellent);
        document.querySelector("#excellent").style.backgroundColor = "green";

        fin();
    } else if (essai < NbMystere) {
        afficherMessage("Trop bas ! essai encore");
    } else if (essai > NbMystere) {
        afficherMessage("Trop haut ! essai encore ");

    }
}
//details de l'essai par utilisateur
function afficherdevine(essai){
    userInput.value = '';
    devinage.innerHTML += `${essai}  `;
    numdevine++
    restant.innerHTML = `${11 - numdevine}  `;
}
//afficher apres chaque essai
function afficherMessage(message){
        tropBas.innerHTML = `<h1>${message}</h1>`
}

function fin(){
    
    userInput.value = '';
    //desactive le bouton du joueur apres avoir épuiser toutes ses chances
    userInput.setAttribute('disabled', '');
    //désactive le bouton envoyer
    envoyer.setAttribute('disabled', '');
    //afficher nouvelle partie
          p.classList.add('button');
          p.innerHTML = `<h1 id="nouvellePartie"></h1>`
    recommencer.appendChild(p);
    jeu = false;
    nouvellePartie();
}

function nouvellePartie(){

    const nouvellePartieButton = document.querySelector('#nouvellePartie');
    nouvellePartieButton.addEventListener('click', function(){
        //reinitialisation
        NbMystere = parseInt((Math.random()*500)+1);
        precedent = [];
        numdevine = 1;
        devinage.innerHTML = '';
        tropBas.innerHTML = '';
        restant.innerHTML = `${11 - numdevine}  `;
        userInput.removeAttribute('disabled');
        recommencer.removeChild(p);
        jeu = true;
        location.reload();
    })
}
