module Presets exposing (..)

import Color
import ColorPicker
import Model exposing (..)
import Turtle exposing (Action(..))


type alias Preset =
    { rules : List ( Char, List Char )
    , axiomApplied : Bool
    , turningAngle : Float
    , lineLength : Float
    , axiom : String
    , iterations : Float
    }


plant1 : Preset
plant1 =
    { rules =
        [ ( 'F', [ 'F', 'F' ] )
        , ( 'x', [ 'F', '-', '[', '[', 'x', ']', '+', 'x', ']', '+', 'F', '[', '+', 'F', 'x', ']', '-', 'x' ] )
        ]
    , axiomApplied = True
    , turningAngle = 22.5
    , lineLength = 6
    , axiom = "x"
    , iterations = 6
    }


plant2 : Preset
plant2 =
    { rules =
        [ ( 'F', [ 'F', 'F', '+', '[', '+', 'F', '-', 'F', '-', 'F', ']', '-', '[', '-', 'F', '+', 'F', '+', 'F', ']' ] )
        ]
    , axiomApplied = True
    , turningAngle = 22.5
    , lineLength = 6
    , axiom = "F"
    , iterations = 6
    }


sqrSierp : Preset
sqrSierp =
    { rules =
        [ ( 'x', [ 'x', 'F', '-', 'F', '+', 'F', '-', 'x', 'F', '+', 'F', '+', 'x', 'F', '-', 'F', '+', 'F', '-', 'x' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 6
    , axiom = "F+xF+F+xF"
    , iterations = 6
    }


crystal : Preset
crystal =
    { rules =
        [ ( 'F', [ 'F', 'F', '+', 'F', '+', '+', 'F', '+', 'F' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 6
    , axiom = "F+F+F+F"
    , iterations = 6
    }


dragonCurve : Preset
dragonCurve =
    { rules =
        [ ( 'x', [ 'x', '+', 'y', 'F', '+' ] )
        , ( 'y', [ '-', 'F', 'x', '-', 'y' ] )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 6
    , axiom = "Fx"
    , iterations = 6
    }
