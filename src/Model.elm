module Model exposing (Model, Symbol, init)

import Turtle exposing (Action(..))


type alias Model =
    { symbolAssignments : List Symbol
    , syntaxDisplay : Bool
    , rules : List ( Char, List Char )
    , selectedSymbol : String
    , selectedAction : Action
    , newRuleInput : String
    , angle : Float
    , lineLength : Float
    , lineWidthIncrement : Float
    , axiom : String
    , iterations : Int
    , startingPoint : ( Float, Float )
    , startingAngle : Float
    , generatedSequence : List Char
    , drawnTurtle : Bool
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
        , { character = "@", action = DrawDot }
        ] ++ emptySymbolAssignments
    , syntaxDisplay = False
    , rules = []
    , selectedSymbol = ""
    , selectedAction = Move
    , newRuleInput = ""
    , angle = 0
    , lineLength = 1
    , lineWidthIncrement = 0
    , axiom = ""
    , iterations = 0
    , startingPoint = ( 700, 500 )
    , startingAngle = 0
    , generatedSequence = []
    , drawnTurtle = False
    }

emptySymbolAssignments : List Symbol
emptySymbolAssignments =
    let
        lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] 

        createSymbol char =
            { character = String.fromChar char, action = NoAction }
    in
    List.map createSymbol lowercaseChars
