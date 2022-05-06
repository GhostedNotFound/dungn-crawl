sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`skelwalkfront`,
    100,
    false
    )
    sprite.follow(mySprite, 60)
    characterAnimations.loopFrames(
    sprite,
    assets.animation`skelwalkfront`,
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    sprite,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff11111f........
        .......fb111111bf.......
        ......fbd1111111f.......
        ......fddd111111df......
        ......fdddd11111df......
        ......fddddddd11df......
        ......fddddddd111f......
        ......fddddddcf11f......
        .......fbdddb1111bf.....
        ........fffcfdb1b1f.....
        .......ffffffffbfbf.....
        ....ff.fffffffffff......
        .....ffffffff...........
        .....ffffffb1b1f........
        ......ffffffbfbf........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......fd1111111f.......
        ......fdd1111111df......
        ......fddd111111df......
        ......fdddddd111df......
        ......fbddddbfd1df......
        ......fcbbbdcfddbf......
        .......fcbb11111f.......
        ........fffff1b1f.......
        ........fb111cfbf.......
        ........ffb1b1ff........
        ......f.fffbfbf.........
        ......ffffffff..........
        .......fffff............
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    sprite,
    assets.animation`skelleft`,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(blockMenu.isMenuOpen()) || !(story.isMenuOpen()) || !(cutsceneActive)) {
    	
    }
})
tiles.onMapLoaded(function (tilemap3) {
    tiles.createSpritesOnTiles(sprites.dungeon.floorDark2, SpriteKind.Enemy)
    tiles.replaceAllTiles(sprites.dungeon.floorDark2, sprites.dungeon.floorDarkDiamond)
    tiles.coverAllTiles(assets.tile`door1`, sprites.dungeon.doorOpenEast)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (debouncehit == 0 && blockSettings.readNumber("godMode") == 0) {
        debouncehit = 1
        hp += -1
        music.thump.play()
        color.setColor(1, color.rgb(255, 0, 0))
        color.setColor(2, color.rgb(255, 0, 0))
        color.setColor(3, color.rgb(255, 0, 0))
        color.setColor(4, color.rgb(255, 0, 0))
        color.setColor(5, color.rgb(255, 0, 0))
        color.startFadeFromCurrent(color.originalPalette)
        pause(2000)
        debouncehit = 0
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(blockMenu.isMenuOpen()) || !(story.isMenuOpen()) || !(cutsceneActive)) {
        controller.moveSprite(mySprite, 0, 0)
        blockMenu.setControlsEnabled(true)
        menuType = 3
        blockMenu.showMenu([
        "ITEM",
        "STAT",
        "GIVE UP",
        "RESUME"
        ], MenuStyle.List, MenuLocation.RightHalf)
    }
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (menuType == 1) {
        if (option == "Start Game") {
            blockMenu.setControlsEnabled(false)
            blockMenu.closeMenu()
            color.FadeToWhite.startScreenEffect(3000)
            color.pauseUntilFadeDone()
            pause(500)
            color.clearFadeEffect()
            story.showPlayerChoices("Play the story.", "SKIP!!")
            menuType = 0
        } else if (option == "Settings") {
            blockMenu.closeMenu()
            menuType = 2
            blockMenu.showMenu([
            "Use Audio: " + blockSettings.readNumber("soundEnabled"),
            "Auto Start: " + blockSettings.readNumber("autoStart"),
            "Radio Functionality: " + blockSettings.readNumber("useRadio"),
            "God Mode: " + blockSettings.readNumber("godMode"),
            "Clear Data",
            "Back"
            ], MenuStyle.List, MenuLocation.FullScreen)
        } else if (option == "Help") {
            blockMenu.closeMenu()
            game.showLongText("You are MARK. You're trapped in a dungeon with no escape, except for the part that you aren't. Navigate your way through hostiles and make it out to your non-existent wife and your non-existent kids!", DialogLayout.Full)
            game.showLongText("Use the D-PAD to move. Press A to interact and B to attack. Good luck!", DialogLayout.Full)
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        } else {
            blockMenu.closeMenu()
            code = game.askForString("Give us thall key, and find mighty treasure!", 6)
        }
    } else if (menuType == 2) {
        if (option.includes("Use Audio")) {
            if (blockSettings.readNumber("soundEnabled") == 1) {
                blockSettings.writeNumber("soundEnabled", 0)
            } else {
                blockSettings.writeNumber("soundEnabled", 1)
            }
            music.baDing.play()
            blockMenu.closeMenu()
            menuType = 1
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        } else if (option.includes("Auto Start")) {
            if (blockSettings.readNumber("autoStart") == 1) {
                blockSettings.writeNumber("autoStart", 0)
            } else {
                blockSettings.writeNumber("autoStart", 1)
            }
            music.baDing.play()
            blockMenu.closeMenu()
            menuType = 1
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        } else if (option.includes("Radio")) {
            if (blockSettings.readNumber("useRadio") == 1) {
                blockSettings.writeNumber("useRadio", 0)
            } else {
                game.splash("useRadio allows for radio communication with other devices.", "Reset now if you wish to cancel. Else, press A.")
                blockSettings.writeNumber("useRadio", 1)
            }
            music.baDing.play()
            blockMenu.closeMenu()
            menuType = 1
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        } else if (option.includes("God")) {
            if (blockSettings.readNumber("godMode") == 1) {
                blockSettings.writeNumber("godMode", 0)
            } else {
                game.splash("This kinda ruins the point of the game.", "Reset now if you wish to cancel. Else, press A.")
                blockSettings.writeNumber("godMode", 1)
            }
            music.baDing.play()
            blockMenu.closeMenu()
            menuType = 1
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        } else if (option == "Clear Data") {
            blockMenu.closeMenu()
            game.showLongText("This will not only clear settings, but erase any data as well. Press A to confirm, and RESET to cancel. THIS CANNOT BE UNDONE!", DialogLayout.Full)
            blockSettings.clear()
            game.splash("Data Erased.", "Press A to restart.")
            game.reset()
        } else {
            blockMenu.closeMenu()
            menuType = 1
            blockMenu.showMenu([
            "Start Game",
            "Settings",
            "Help",
            "Enter Code"
            ], MenuStyle.List, MenuLocation.BottomHalf)
        }
    } else {
        if (option == "ITEM") {
            confirmGiveUp = 0
            blockMenu.setControlsEnabled(false)
            game.splash("doesn't work yet lol")
            blockMenu.setControlsEnabled(true)
        } else if (option == "STAT") {
            confirmGiveUp = 0
            blockMenu.closeMenu()
            controller.moveSprite(mySprite, 75, 75)
            game.showLongText([
            "MARK",
            "\\nLEVEL " + lvl,
            "\\nMAX HP: " + maxHP,
            "\\nCUR HP: " + info.life(),
            "\\nWEAPON: " + weapon,
            "\\nPROB OF DYING: yes",
            "\\nPress A to close. (WILL RESUME GAME)"
            ], DialogLayout.Full)
        } else if (option == "GIVE UP") {
            if (confirmGiveUp == 0) {
                game.splash("...seriously?", "Select again to confirm.")
                confirmGiveUp = 1
            } else {
                game.splash("Alrighty then.", "Goodbye!")
                game.over(false, effects.dissolve)
            }
        } else {
            confirmGiveUp = 0
            controller.moveSprite(mySprite, 75, 75)
            blockMenu.closeMenu()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`door1`, function (sprite, location) {
	
})
let confirmGiveUp = 0
let code = ""
let debouncehit = 0
let mySprite: Sprite = null
let cutsceneActive = 0
let menuType = 0
let weapon = ""
let lvl = 0
let maxHP = 0
let hp = 3
maxHP = 5
lvl = 1
weapon = "Fists"
menuType = 1
if (!(blockSettings.exists("soundEnabled"))) {
    blockSettings.writeNumber("soundEnabled", 1)
    blockSettings.writeNumber("useRadio", 0)
    blockSettings.writeNumber("autoStart", 0)
    blockSettings.writeNumber("godMode", 0)
}
blockMenu.setControlsEnabled(true)
blockMenu.setColors(15, 1)
blockMenu.showMenu([
"Start Game",
"Settings",
"Help",
"Enter Code"
], MenuStyle.List, MenuLocation.BottomHalf)
let textSprite = textsprite.create("DUNGN BLAST", 15, 1)
let textSprite2 = textsprite.create("Pocket Edition", 15, 1)
textSprite.setOutline(1, 6)
textSprite2.setOutline(1, 6)
textSprite.setMaxFontHeight(10)
textSprite2.setMaxFontHeight(8)
textSprite.setPosition(70, 13)
textSprite2.setPosition(116, 53)
let tilemap1 = tiles.createMap(tilemap`level0`)
let tilemap2 = tiles.createMap(tilemap`level0`)
while (menuType) {
    pause(100)
}
textSprite.setText("")
textSprite2.setText("")
textSprite.setMaxFontHeight(0)
textSprite2.setMaxFontHeight(0)
if (story.checkLastAnswer("Play the story.")) {
    story.startCutscene(function () {
        cutsceneActive = 1
        story.printText("How long has it been...?", 100, 50, 1, 15, story.TextSpeed.Normal)
        pause(100)
        story.printText("Days? Weeks? Months?", 100, 50, 1, 15, story.TextSpeed.Normal)
        pause(100)
        story.printText("I feel like I'm going insane...", 100, 50, 1, 15, story.TextSpeed.Normal)
        pause(100)
        story.printText("What did I do to deserve this?", 100, 50, 1, 15, story.TextSpeed.Normal)
        pause(100)
        story.printText("Now I'm in here, but I know where the escape is.", 100, 50, 1, 15, story.TextSpeed.Normal)
        pause(100)
        story.printText("And I know just how I'm going to reach it.", 100, 50, 1, 15, story.TextSpeed.Slow)
        story.setSoundEnabled(true)
        tiles.setCurrentTilemap(tilemap`levelcut`)
        mySprite = sprites.create(assets.image`plr`, SpriteKind.Player)
        mySprite.setPosition(28, 22)
        scene.centerCameraAt(mySprite.x + 10, mySprite.y + 10)
        pause(500)
        story.spriteSayText(mySprite, "...", 1, 15, story.TextSpeed.Normal)
        pause(100)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . f f e 2 f f f f f f 2 e f f . 
            . f f f f f e e e e f f f f f . 
            . . f e f b f 4 4 f b f e f . . 
            . . f e 4 1 f d d f 1 4 e f . . 
            . . . f e 4 d d d d 4 e f e . . 
            . . f e f 2 2 2 2 e d d 4 e . . 
            . . e 4 f 2 2 2 2 e d d e . . . 
            . . . . f 4 4 5 5 f e e . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . f f f . . . . . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f e e 2 2 2 2 2 2 e f f . . 
            . f f e 2 f f f f f f 2 e f f . 
            . f f f f f e e e e f f f f f . 
            . . f e f b f 4 4 f b f e f . . 
            . . f e 4 1 f d d f 1 4 e f . . 
            . . e f e 4 d d d d 4 e f . . . 
            . . e 4 d d e 2 2 2 2 f e f . . 
            . . . e d d e 2 2 2 2 f 4 e . . 
            . . . . e e f 5 5 4 4 f . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . f f f . . . . 
            `],
        500,
        false
        )
        story.spriteMoveToLocation(mySprite, 28, 54, 44)
        story.printCharacterText("I've always wondered how things work around here.", "Ero")
        story.printCharacterText("However...", "Ero")
        story.printCharacterText("This should do it.", "Ero")
        pause(1000)
        tiles.setCurrentTilemap(tilemap`level0`)
        scene.cameraShake(5, 500)
        color.FadeToBlack.startScreenEffect()
        game.reset()
    })
    story.cancelCurrentCutscene()
} else {
    mySprite = sprites.create(assets.image`plr`, SpriteKind.Player)
    tiles.loadMap(tilemap1)
    tiles.connectMapById(tilemap1, tilemap2, ConnectionKind.Door1)
    mySprite.setPosition(28, 52)
}
cutsceneActive = 0
scene.cameraFollowSprite(mySprite)
let statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
statusbar.setLabel("HP")
statusbar.setColor(7, 2)
controller.moveSprite(mySprite, 75, 75)
statusbar.max = maxHP
forever(function () {
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`downWalk`,
    100,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkUp`,
    100,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkRight`,
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`walkLeft`,
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
})
game.onUpdateInterval(500, function () {
    statusbar.value = hp
    if (hp == 0) {
        game.over(false, effects.dissolve)
    }
})
