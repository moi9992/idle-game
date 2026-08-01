const pierre = document.getElementById('1')
const argent = document.getElementById('2')
const antimatière = document.getElementById('3')
const prod1 = document.getElementById('prod_sec_1')
const modalStat = document.getElementById('modal_stat')
const fermerBtn = document.querySelector('.fermer')
const modalObjectifPrincipal = document.getElementById('modal_objectif_principale')
const modalQuete = document.getElementById('modal_quete')
const modalUpgrade = document.getElementById('modal_upgrade')
const modals = [modalStat, modalObjectifPrincipal, modalQuete, modalUpgrade]

let pierreCount = 0
let argentCount = 0 
let antimatièreCount = 0
let pierreGen = 0
let argentGen = 0 
let antimatièreGen = 0
let pierreGenCout = 10
let argentGenCout = 10
let antimatièreGenCout = 10
let pierreClickBonusCout = 50
let pierreClickBonus = 1
let genUpgradeCout = 200
let genBonusCout = 1
let upgradeClick1Achete = false
let upgradeGen1Achete = false
let cursorAuto = 0
let cursorAutoCout = 100
let stat_pierres = document.getElementById('stat_pierres')
let stat_argent = document.getElementById('stat_argent')
let stat_antimatière = document.getElementById('stat_antimatière')
let pierreTotal = 0
let clickTotal = 0
let TempJeu = 0
let quete1Complete = false
let quete2Complete = false
let quete3Complete = false
let bonusTotal = 1

function fermerToutesLesModals() {
    modals.forEach (modal => {
        modal.style.display = 'none'
    })
}

function sauvegarderJeu() {
    const sauvegarde = {pierreCount, pierreGen, pierreGenCout, cursorAuto, cursorAutoCout}
    const sauvegardeTexte = JSON.stringify(sauvegarde)
    localStorage.setItem('idleGameSave', sauvegardeTexte)
}

function chargerJeu() {
    const sauvegardeLoad = localStorage.getItem('idleGameSave') 
    if(sauvegardeLoad !== null) {
        const sauvegardeLoadJSON = JSON.parse(sauvegardeLoad)
        pierreCount = sauvegardeLoadJSON.pierreCount
        pierreGen = sauvegardeLoadJSON.pierreGen
        pierreGenCout = sauvegardeLoadJSON.pierreGenCout
        cursorAuto = sauvegardeLoadJSON.cursorAuto
        cursorAutoCout = sauvegardeLoadJSON.cursorAutoCout
    }
}

chargerJeu()

document.getElementById('button1').addEventListener('click', () => {
    pierreCount += pierreClickBonus
    pierre.innerText = pierreCount
    stat_pierres.innerText = pierreTotal += pierreClickBonus
    clickTotal += 1
    document.getElementById('stat_clicks').innerText = clickTotal
})

document.getElementById('button2').addEventListener('click', () => {
    argentCount++
    argent.innerText = argentCount
    stat_argent.innerText = argentCount
})

document.getElementById('button3').addEventListener('click', () => {
    antimatièreCount++
    antimatière.innerText = antimatièreCount
    stat_antimatière.innerText = antimatièreCount
})

document.getElementById('gen_1').addEventListener('click', () => {
    if(pierreCount >= pierreGenCout) {
        pierreGen++
        pierreCount -= pierreGenCout 
        pierreGenCout *= 2 
        pierre.innerText = pierreCount
        document.getElementById('genNombre').innerText = pierreGen
        document.getElementById('gen_1').innerText= `next générateur (${pierreGenCout} pierres)`
    }
})

setInterval(() => {
            pierreCount += (pierreGen * genBonusCout + cursorAuto * pierreClickBonus) * bonusTotal
            pierreTotal += (pierreGen * genBonusCout + cursorAuto * pierreClickBonus) * bonusTotal
            stat_pierres.innerText = pierreTotal
            pierre.innerText = Math.floor(pierreCount)
            if(pierreCount >= 1000000) {
                document.getElementById('debloque_monde_2').style.display = 'block'
            }
            if(pierreCount >= 40 && !upgradeClick1Achete) {
                document.getElementById('upgrade_click_1').style.display = 'block'
            }
            if(pierreCount >= 180 && !upgradeGen1Achete) {
                document.getElementById('upgrade_gen_1').style.display = 'block'
            }
            if(pierreCount >= cursorAutoCout) {
                document.getElementById('auto_click_1').style.display = 'block'
            }
            if(pierreCount < cursorAutoCout) {
                document.getElementById('auto_click_1').style.display = 'none'
            }
            if(pierreCount < pierreClickBonusCout) {
                document.getElementById('upgrade_click_1').style.display = 'none'
            }
            if(pierreCount < genUpgradeCout) {
                document.getElementById('upgrade_gen_1').style.display = 'none'
            }
            if(pierreTotal >= 1000 && !quete1Complete) {
                document.getElementById('quete1').style.display = 'block'
            }
            if(clickTotal >= 100 && !quete2Complete) {
                document.getElementById('quete2').style.display = 'block'
            }
            if(pierreGen >= 10 && !quete3Complete) {
                document.getElementById('quete3').style.display = 'block'
            }
            if(quete1Complete && quete2Complete && quete3Complete) {
                bonusTotal = 1.05
            }
            document.getElementById('genNombre').innerText = pierreGen
            document.getElementById('gen_1').innerText= `next générateur (${pierreGenCout} pierres)`
            prod1.innerText = `${pierreGen * genBonusCout + cursorAuto * pierreClickBonus} pierre par seconde`
        }, 1000)

document.getElementById('gen_2').addEventListener('click', () => {
    if(argentCount >= argentGenCout) {
        argentGen++
        argentCount -= argentGenCout
        argentGenCout *= 2
        argent.innerText = argentCount
    }
})

setInterval(() => {
    argentCount += argentGen
    argent.innerText = argentCount
    if(argentCount >= 1000000000) {
        document.getElementById('debloque_monde_3').style.display = 'block'
    }
}, 1000)

document.getElementById('gen_3').addEventListener('click', () => {
    if(antimatièreCount >= antimatièreGenCout) {
        antimatièreGen++
        antimatièreCount -= antimatièreGenCout
        antimatièreGenCout *= 2
        antimatière.innerText = antimatièreCount
    }
})

setInterval(() => {
    antimatièreCount += antimatièreGen
    antimatière.innerText = antimatièreCount
}, 1000)

document.getElementById('debloque_monde_2').addEventListener('click', () => {
    document.getElementById('monde2').style.display = 'block'
})

document.getElementById('debloque_monde_3').addEventListener('click', () => {
    document.getElementById('monde3').style.display = 'block'
})

document.getElementById('upgrade_click_1').addEventListener('click', () => {
    if(pierreCount >= 50) {
        pierreClickBonus++
        pierreCount -= pierreClickBonusCout
        document.getElementById('upgrade_click_1').style.display = 'none'
        upgradeClick1Achete = true
    }
})

document.getElementById('upgrade_gen_1').addEventListener('click', () => {
    if(pierreCount >= 200) {
        genBonusCout++
        pierreCount -= genUpgradeCout
        document.getElementById('upgrade_gen_1').style.display = 'none'
        upgradeGen1Achete = true
    }
})

document.getElementById('auto_click_1').addEventListener('click', () => {
    if(pierreCount >= cursorAutoCout) {
        cursorAuto++
        pierreCount -= cursorAutoCout
        document.getElementById('auto_click_1').style.display = 'block'
        cursorAutoCout *= 2
        document.getElementById('auto_click_1').innerText = `auto click (${cursorAutoCout} pierres)`
    }
})

document.getElementById('stat').addEventListener('click', () => {
    if(modalStat.style.display === 'block') {
        modalStat.style.display = 'none'
    } else {
        fermerToutesLesModals()
        modalStat.style.display = 'block'
    }
})

fermerBtn.addEventListener('click', () => {
    modalStat.style.display = 'none'
})

setInterval(() => {
    TempJeu++
    let jours = Math.floor(TempJeu / 86400)
    let heures = Math.floor((TempJeu % 86400) / 3600)
    let minutes = Math.floor((TempJeu % 3600) / 60)
    let secondes = TempJeu % 60
    document.getElementById('stat_temps_jours').innerText = jours
    document.getElementById('stat_temps_heures').innerText = heures
    document.getElementById('stat_temps_minutes').innerText = minutes
    document.getElementById('stat_temps_secondes').innerText = secondes
}, 1000)

document.getElementById('objectif').addEventListener('click', () => {
    if(modalObjectifPrincipal.style.display === 'block') {
        modalObjectifPrincipal.style.display = 'none'
    } else {
        fermerToutesLesModals()
        modalObjectifPrincipal.style.display = 'block'
    }
})

document.getElementById('fermer1').addEventListener('click', () => {
    modalObjectifPrincipal.style.display = 'none'
})

document.getElementById('quete').addEventListener('click', () => {
    if(modalQuete.style.display === 'block') {
        modalQuete.style.display = 'none'
    } else {
        fermerToutesLesModals()
        modalQuete.style.display = 'block'
    }
})

document.getElementById('fermer2').addEventListener('click', () => {
    modalQuete.style.display = 'none'
})

document.getElementById('quete1').addEventListener('click', () => {
    if(pierreTotal >= 1000) {
        quete1Complete = true
        document.getElementById('quete1').style.display = 'none'
        pierreClickBonus++
        document.getElementById('p_quete1').style.color = 'green'
    }
})

document.getElementById('quete2').addEventListener('click', () => {
    if(clickTotal >= 100) {
        quete2Complete = true
        document.getElementById('quete2').style.display = 'none'
        document.getElementById('p_quete2').style.color = 'green'
        cursorAuto++
    }
})

document.getElementById('quete3').addEventListener('click', () => {
    if(pierreGen >= 1) {
        quete3Complete = true
        document.getElementById('quete3').style.display = 'none'
        document.getElementById('p_quete3').style.color = 'green'
        pierreGen++
    }
})

document.getElementById('zone_upgrade').addEventListener('click', () => {
    if(modalUpgrade.style.display === 'flex') {
        modalUpgrade.style.display = 'none'
    } else {
        fermerToutesLesModals()
        modalUpgrade.style.display = 'flex'
    }
})

document.getElementById('fermer3').addEventListener('click', () => {
    modalUpgrade.style.display = 'none'
})

setInterval(() => {
    sauvegarderJeu()
}, 10000)