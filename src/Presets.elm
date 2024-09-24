module Presets exposing (..)

import Color
import ColorPicker
import Turtle exposing (Action(..))


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


rings : Preset
rings =
    { rules =
        [ ( 'F'
          , [ 'F', 'F', '+', 'F', '+', 'F', '+', 'F', '+', 'F', '+', 'F', '-', 'F' ]
          )
        ]
    , axiomApplied = True
    , turningAngle = 90
    , lineLength = 6
    , axiom = "F+F+F+F"
    , iterations = 3
    , startingAngle = 0
    }


kolam : Preset
kolam =
    { rules =
        [ ( 'a'
          , [ 'F', '+', '+', 'F', 'F', 'F', 'F', '-', '-', 'F', '-', '-', 'F', 'F', 'F', 'F', '+', '+', 'F', '+', '+', 'F', 'F', 'F', 'F', '-', '-', 'F' ]
          )
        , ( 'b'
          , [ 'F', '-', '-', 'F', 'F', 'F', 'F', '+', '+', 'F', '+', '+', 'F', 'F', 'F', 'F', '-', '-', 'F', '-', '-', 'F', 'F', 'F', 'F', '+', '+', 'F' ]
          )
        , ( 'c'
          , [ 'b', 'F', 'a', '-', '-', 'b', 'F', 'a' ]
          )
        , ( 'd'
          , [ 'c', 'F', 'c', '-', '-', 'c', 'F', 'c' ]
          )
        ]
    , axiomApplied = True
    , turningAngle = 45
    , lineLength = 7
    , axiom = "(-d--d)"
    , iterations = 3
    , startingAngle = 180
    }


pentaPlex : Preset
pentaPlex =
    { rules =
        [ ( 'F'
          , [ 'F', '+', '+', 'F', '+', '+', 'F', '|', 'F', '-', 'F', '+', '+', 'F' ]
          )
        ]
    , axiomApplied = True
    , turningAngle = 36
    , lineLength = 8
    , axiom = "F++F++F++F++F"
    , iterations = 3
    , startingAngle = 0
    }


kochIslandVar : Preset
kochIslandVar =
    { rules =
        [ ( 'x'
          , [ 'x', '+', 'y', 'F', '+', '+', 'y', 'F', '-', 'F', 'x', '-', '-', 'F', 'x', 'F', 'x', '-', 'y', 'F', '+', 'x' ]
          )
        , ( 'y'
          , [ '-', 'F', 'x', '+', 'y', 'F', 'y', 'F', '+', '+', 'y', 'F', '+', 'F', 'x', '-', '-', 'F', 'x', '-', 'y', 'F' ]
          )
        ]
    , axiomApplied = True
    , turningAngle = 45
    , lineLength = 4
    , axiom = "x+x+x+x+x+x+x+x"
    , iterations = 2
    , startingAngle = 0
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
    [ plant1
    , plant2
    , kochIslandVar
    , pentaPlex
    , sqrSierp
    , crystal
    , rings
    , kolam
    ]
