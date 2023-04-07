module Model exposing (Model, Symbol, init)

import Turtle exposing (Action(..))
import Color
import ColorPicker


type alias Model =
    { symbolAssignments : List Symbol
    , syntaxDisplay : Bool
    , rules : List ( Char, List Char )
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
    , iterations : Int
    , startingPoint : ( Float, Float )
    , startingAngle : Float
    , polygonFillColor : Color.Color
    , colorPicker : ColorPicker.State
    , generatedSequence : List Char
    , drawnTurtle : Bool
    , canvasWidth : Float 
    , canvasHeight : Float
    }



-- Represents a single symbol in the L-system, mapping a character to a corresponding action.


type alias Symbol =
    { character : String
    , action : Action
    }


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
    , generatedSequence = []
    , drawnTurtle = False
    , canvasWidth = 500
    , canvasHeight = 500
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
