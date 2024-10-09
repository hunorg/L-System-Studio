module SymbolAssignments exposing (..)

import Turtle exposing (Action(..))


type alias Symbol =
    { character : String
    , action : Action
    }


type alias Rule =
    ( Char, List Char )


emptySymbolAssignments : List Symbol
emptySymbolAssignments =
    let
        lowercaseChars =
            [ 'a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]

        createSymbol char =
            { character = String.fromChar char, action = NoAction }
    in
    List.map createSymbol lowercaseChars


allSymbolAssignments : List Symbol
allSymbolAssignments =
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
