module Model exposing (Model, Preset, Rule, Symbol, init, initPreset)

import Array exposing (Array)
import Color
import ColorPicker
import Random
import Turtle exposing (Action(..))


type alias Model =
    { symbolAssignments : List Symbol
    , syntaxDisplay : Bool
    , rules : List Rule
    , selectedRule : Maybe Rule
    , selectedSymbol : String
    , selectedAction : Action
    , newRuleInput : String
    , axiomApplied : Bool
    , turningAngle : Float
    , turningAngleIncrement : Float
    , lineLength : Float
    , lineLengthScale : Float
    , lineWidthIncrement : Float
    , axiom : String
    , iterations : Float
    , startingPoint : ( Float, Float )
    , startingAngle : Float
    , polygonFillColor : Color.Color
    , colorPicker : ColorPicker.State
    , generatedSequence : Array Char
    , drawnTurtle : Bool
    , canvasWidth : Float
    , canvasHeight : Float
    , showSidebar : Bool
    , selectedPreset : Preset
    , presets : List Preset
    , randomGenerator : Random.Generator Int
    }



-- Represents a single symbol in the L-system, mapping a character to a corresponding action.


type alias Symbol =
    { character : String
    , action : Action
    }


type alias Rule =
    ( Char, List Char )


init : Model
init =
    { symbolAssignments =
        [ { character = "F", action = Move }
        , { character = "G", action = Move }
        , { character = "f", action = MoveWithoutDrawing }
        , { character = "+", action = TurnLeft }
        , { character = "-", action = TurnRight }
        , { character = "|", action = ReverseDirection }
        , { character = "[", action = Push }
        , { character = "]", action = Pop }
        , { character = "#", action = IncrementLineWidth }
        , { character = "!", action = DecrementLineWidth }
        , { character = "@", action = DrawDot }
        , { character = "{", action = OpenPolygon }
        , { character = "}", action = ClosePolygon }
        , { character = "<", action = MultiplyLength }
        , { character = ">", action = DivideLength }
        , { character = "&", action = SwapPlusMinus }
        , { character = "(", action = DecrementTurningAngle }
        , { character = ")", action = IncrementTurningAngle }
        ]
            ++ emptySymbolAssignments
    , syntaxDisplay = False
    , rules = []
    , selectedRule = Nothing
    , selectedSymbol = "F"
    , selectedAction = Move
    , newRuleInput = ""
    , axiomApplied = False
    , turningAngle = 0
    , turningAngleIncrement = 0
    , lineLength = 1
    , lineLengthScale = 0
    , lineWidthIncrement = 0
    , axiom = ""
    , iterations = 0
    , startingPoint = ( 250, 250 )
    , startingAngle = 0
    , polygonFillColor = Color.red
    , colorPicker = ColorPicker.empty
    , generatedSequence = Array.empty
    , drawnTurtle = False
    , canvasWidth = 500
    , canvasHeight = 500
    , showSidebar = True
    , selectedPreset = plant1
    , presets = presets
    , randomGenerator = Random.int 0 (List.length presets - 1)
    }


emptySymbolAssignments : List Symbol
emptySymbolAssignments =
    let
        lowercaseChars =
            [ 'a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]

        createSymbol char =
            { character = String.fromChar char, action = NoAction }
    in
    List.map createSymbol lowercaseChars


type alias Preset =
    { rules : List ( Char, List Char )
    , axiomApplied : Bool
    , turningAngle : Float
    , lineLength : Float
    , axiom : String
    , iterations : Float
    , startingAngle : Float
    }


plant1 : Preset
plant1 =
    { rules =
        [ ( 'F', [ 'F', 'F' ] )
        , ( 'x', [ 'F', '-', '[', '[', 'x', ']', '+', 'x', ']', '+', 'F', '[', '+', 'F', 'x', ']', '-', 'x' ] )
        ]
    , axiomApplied = True
    , turningAngle = 22.5
    , lineLength = 4
    , axiom = "x"
    , iterations = 5
    , startingAngle = -90
    }


plant2 : Preset
plant2 =
    { rules =
        [ ( 'F', [ 'F', 'F', '+', '[', '+', 'F', '-', 'F', '-', 'F', ']', '-', '[', '-', 'F', '+', 'F', '+', 'F', ']' ] )
        ]
    , axiomApplied = True
    , turningAngle = 22.5
    , lineLength = 8
    , axiom = "F"
    , iterations = 3
    , startingAngle = -90
    }


sqrSierp : Preset
sqrSierp =
    { rules =
        [ ( 'x', [ 'x', 'F', '-', 'F', '+', 'F', '-', 'x', 'F', '+', 'F', '+', 'x', 'F', '-', 'F', '+', 'F', '-', 'x' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 8
    , axiom = "F+xF+F+xF"
    , iterations = 3
    , startingAngle = 0
    }


crystal : Preset
crystal =
    { rules =
        [ ( 'F', [ 'F', 'F', '+', 'F', '+', '+', 'F', '+', 'F' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 3
    , axiom = "F+F+F+F"
    , iterations = 4
    , startingAngle = 0
    }


dragonCurve : Preset
dragonCurve =
    { rules =
        [ ( 'x', [ 'x', '+', 'y', 'F', '+' ] )
        , ( 'y', [ '-', 'F', 'x', '-', 'y' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 8
    , axiom = "Fx"
    , iterations = 9
    , startingAngle = 0
    }


initPreset : Preset
initPreset =
    { rules = []
    , axiomApplied = False
    , turningAngle = 0
    , lineLength = 0
    , axiom = ""
    , iterations = 0
    , startingAngle = 0
    }


presets : List Preset
presets =
    [ plant1, plant2, sqrSierp, crystal, dragonCurve ]
