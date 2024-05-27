

//level
var level = 1;
var before_level = 1;
var nextLevel = 2;

// Timer
var timer = 0;
var time_at_start_level = 0;

// create background
var backgroundSprite = createSprite(200,200,400,400);
backgroundSprite.setAnimation("underground_1");

// Create edgeSprites
var edgeSprites = createEdgeSprites();

// Create player
var player = createSprite(350,50,30,30);
player.setAnimation("alienPink_1");
player.depth = 3;
var playerOrientation = true;
var playerSpeed = 3;


// Create Door
var door = createSprite(370,200,30,30);
door.setAnimation("cardBack_red3_1");
door.visible = false;

// Create Continue Button
var Continue = createSprite(200,200,40,40);
Continue.setAnimation("Enter");
Continue.visible = false;



//problem Sprite Position
var Position = [100,150];

// Enter button
var Enter = createSprite(Position[0] +50,Position[1] + 100,30,30);
Enter.setAnimation("Enter");
Enter.visible = false;
Enter.depth = 2;
Enter.scale = 0.4;


// Enter and exit Boxes and habilitador
var Entries_Boxes = createGroup();
var exit_Boxes = createGroup();
var Habilitador = createSprite(Position[0],Position[1] + 109, 15,15);
Habilitador.visible = false;



// create BluePrint del problema
var imagenProblema = createSprite(Position[0],Position[1],70,70);
imagenProblema.depth = 1;
imagenProblema.scale = 0.3;
imagenProblema.visible = false;


// create Encoder, enter boxes and exit boxes.
function create_enCoder_Entry_Exit_boxes()
{
    imagenProblema.setAnimation("EncoderFinal");
    console.log(imagenProblema.x, " ", imagenProblema.y);
    
    var y  = 107;
    for (var i = 0; i < 8; i++) 
    {
        var box = createSprite(Position[0] - 88,Position[1] - y,15,15);
        box.depth = 2;
        Entries_Boxes.add(box);
        y -= 21;
    }
    Entries_Boxes[4].y += 2;
    Entries_Boxes[6].y += 3;
    Entries_Boxes[7].y += 5;
    
    y = 42;
    for (var j = 0; j < 3; j++) 
    {
        var box = createSprite(Position[0] + 88, Position[1] - y,15,15);
        box.depth = 2;
        exit_Boxes.add(box);
        y -= 43;
    }

    // Make all boxes invisible
    exit_Boxes.setVisibleEach(false);
    Entries_Boxes.setVisibleEach(false);
}

// create DeCoder, enter boxes and exit boxes.
function create_DeCoder_Entry_exit_boxes()
{
    imagenProblema.setAnimation("DecoderFinal");

    var y = 110;
    for (var i = 0; i < 8; i++) 
    {
        var box = createSprite(Position[0] + 88,Position[1] - y,15,15);
        box.depth = 2;
        exit_Boxes.add(box);
        y -= 22;
    }

    y = 65;
    for (var j = 0; j < 3; j++) 
    {
        var box = createSprite(Position[0] - 88, Position[1] - y,15,15);
        box.depth = 2;
        Entries_Boxes.add(box);
        y -= 43;
    }

    // Make all boxes invisible
    exit_Boxes.setVisibleEach(false);
    Entries_Boxes.setVisibleEach(false);
}


// create 0 and 1
var Zero_group = createGroup();
var One_group = createGroup();
var Agarrado = null;

function create_0_1()
{
    var height_Y = 300;
    var width_X = 20;
    for (var i = 0; i < 8; i++) 
    {
        var zero = createSprite(width_X,height_Y,15,15);
        zero.setAnimation("zero");
        Zero_group.add(zero);
        width_X += 25;
    }
    width_X = 20;
    for (var j = 0; j < 8; j++) 
    {
        var one = createSprite(width_X,height_Y + 50,15,15);
        one.setAnimation("one");
        One_group.add(one);
        width_X += 25;
    }

    Zero_group.setVisibleEach(false);
    One_group.setVisibleEach(false);
}


function createLevel1()
{
    // Crea el nivel uno fuera del ciclo pra que no se cree cada frame
    create_enCoder_Entry_Exit_boxes();
    exit_Boxes[0].setAnimation("ExitLight");
    create_0_1();
}


//player movement

function player_movement()
{
    //Movimientos
    if(keyDown("w"))
    {
        player.y -= playerSpeed;
    }
    if(keyDown("s"))
    {
        player.y += playerSpeed;
    }
    if(keyDown("a"))
    {
        player.x -= playerSpeed;
        playerOrientation = false;
    }
    if(keyDown("d"))
    {
        player.x += playerSpeed;
        playerOrientation = true;
    }

    //Animaciones
    if(keyDown("w") || keyDown("s") || keyDown("a") || keyDown("d"))
    {
        player.setAnimation("alienPink_walk1");
        if(playerOrientation)
        {
            player.mirrorX(1);
        }
        else
        {
            player.mirrorX(-1);
        }
    }
    else
    {
        player.setAnimation("alienPink_1");
    }

    // Colisiones
    player.collide(edgeSprites);

    // Agarrado y movimiento del objeto
    Agarrado_y_movimiento_del_objeto();

}

// Movimiento del agarrado



//Pick up a 1 or 0
function Agarrado_y_movimiento_del_objeto()
{
    for (var i = 0; i < Zero_group.length; i++) 
    {
        // Si se presiona la tecla r y el jugador esta encima de un cero
        if (keyWentDown("r") && player.overlap(Zero_group[i]))
        {
            Agarrado = Zero_group[i];
        }
        // Si se presiona la tecla r y el jugador esta encima de un uno
        if (keyWentDown("r") && player.overlap(One_group[i]))
        {
            Agarrado = One_group[i];
        }

        // si se presiona la tecla y se suelta el objeto
        if (keyWentDown("y"))
        {
            Agarrado = null;
        }
        
        // si hay un objeto agarrado, se lo mueve con el jugador
        if (Agarrado != null)
        {
            Agarrado.x = player.x;
            Agarrado.y = player.y;
        }
    }
}







function destroySprites()
{
    Zero_group.destroyEach();
    One_group.destroyEach();
    Entries_Boxes.destroyEach();
    exit_Boxes.destroyEach();
    Habilitador.visible = false;
    imagenProblema.visible = false;
    Enter.visible = false;
    player.visible = false;

}

function makeSpritesVisible()
{
    Zero_group.setVisibleEach(true);
    One_group.setVisibleEach(true);
    Entries_Boxes.setVisibleEach(true);
    exit_Boxes.setVisibleEach(true);
    Habilitador.visible = true;
    imagenProblema.visible = true;
    Enter.visible = true;
    player.visible = true;
}


function level1_win_or_loose()
{
    if (Clicked(Enter))
    {
        if(Habilitador.overlap(One_group) && Entries_Boxes[0].overlap(Zero_group) && Entries_Boxes[1].overlap(Zero_group) && Entries_Boxes[2].overlap(Zero_group) && Entries_Boxes[3].overlap(Zero_group) && Entries_Boxes[4].overlap(One_group) && Entries_Boxes[5].overlap(Zero_group) && Entries_Boxes[6].overlap(Zero_group) && Entries_Boxes[7].overlap(Zero_group))
        {
            backgroundSprite.setAnimation("desert");

            level = "continue";
            nextLevel = 2;

            // destroy and hide all the sprites of level 1
            destroySprites();

            // reset player position
            player.x = 350;
            player.y = 50;
        }
        else
        {
            level =  "deathScreen";
            before_level = 1;

            // destroy and hide all the sprites of level 1
            destroySprites();

            createLevel1(); // create level 1 again with all sprites invisible

            // reset player position
            player.x = 350;
            player.y = 50;
        }
    }
}


// create function to check if the mouse is clicked on the sprite.
function Clicked(sprite)
{
    if (mouseWentDown("leftButton") && sprite.overlapPoint(World.mouseX,World.mouseY))
    {
        return true;
    }
}

function ContinueButtonPressed(goLevel)
{
    if (Clicked(Continue))
    {
        level = goLevel;
        Continue.visible = false; 
    }

}




// se crea el nivel 1 antes de que se ejecute el draw pra que no se cree cada frame
createLevel1();

function draw()
{
    background("white");
    
    if (level == 1)
    {
        backgroundSprite.setAnimation("underground_1");
        makeSpritesVisible();
        level1_win_or_loose();
    }
    else if (level == "continue")
    {
        backgroundSprite.setAnimation("space_1");
        Continue.visible = true;
        ContinueButtonPressed(nextLevel);

    }
    else if (level == "deathScreen")
    {
        backgroundSprite.setAnimation("background_landscape02_1");
        Continue.visible = true;
        ContinueButtonPressed(before_level);
        
    }
    
    player_movement();
    drawSprites();
}
