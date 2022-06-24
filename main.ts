function introducao () {
    for (let index = 0; index < 8; index++) {
        criar_sequencia()
        for (let índice = 0; índice <= sequencia.length - 1; índice++) {
            ativar_leds(sequencia[índice], 5)
        }
    }
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        # # . . .
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.clearScreen()
}
function criar_sequencia () {
    direcao = ["A", "B"]
    temporaria = []
    sequencia = []
    for (let índice = 0; índice <= direcao.length - 1; índice++) {
        temporaria.push(direcao[índice])
    }
    for (let index = 0; index < temporaria.length - 1; index++) {
        posicao = randint(0, temporaria.length - 1)
        sequencia.unshift(temporaria[posicao])
        temporaria.removeAt(posicao)
    }
}
function ativar_leds (seta: string, tempo_exposicao: number) {
    if (seta == "A") {
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # . .
            . # # . .
            . . # . .
            `)
        music.playTone(440, music.beat(BeatFraction.Whole))
    }
    if (seta == "B") {
        basic.showLeds(`
            . . # . .
            . . # # .
            . . # # #
            . . # # .
            . . # . .
            `)
        music.playTone(659, music.beat(BeatFraction.Whole))
    }
    basic.pause(tempo_exposicao)
}
let opcao_jogador = ""
let posicao = 0
let temporaria: string[] = []
let direcao: string[] = []
let sequencia: string[] = []
let velocidade = 30
game.setScore(0)
introducao()
criar_sequencia()
basic.forever(function () {
    while (!(game.isGameOver())) {
        basic.clearScreen()
        basic.showLeds(`
            # # # # #
            # . . . .
            # # # # #
            . . . . #
            # # # # #
            `)
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= sequencia.length - 1; índice++) {
            ativar_leds(sequencia[índice], velocidade)
        }
        basic.showString("#")
        basic.pause(1000)
        basic.clearScreen()
        for (let índice = 0; índice <= sequencia.length - 1; índice++) {
            opcao_jogador = "#"
            while (opcao_jogador == "#") {
                if (input.buttonIsPressed(Button.A)) {
                    opcao_jogador = "A"
                }
                if (input.buttonIsPressed(Button.B)) {
                    opcao_jogador = "B"
                }
                ativar_leds(opcao_jogador, velocidade)
            }
            if (opcao_jogador != sequencia[índice]) {
                game.gameOver()
            }
        }
        velocidade += -2
        game.addScore(1)
        sequencia.push(direcao[randint(0, 1)])
        basic.pause(500)
    }
})
