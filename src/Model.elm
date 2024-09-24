module Model exposing (Model, Rule, Symbol, init)

import Array exposing (Array)
import Color
import ColorPicker
import Presets exposing (..)
import Random
import Select exposing (Select)
import Time
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
    , recursionDepth : Float
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
    , renderingProgress : Float
    , animationSpeed : Float
    , animationStartTime : Maybe Time.Posix
    , loadingIconVisible : Bool
    , lastAnimationFrameTimestamp : Maybe Time.Posix
    , selectSymbol : Select Symbol
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
    { symbolAssignments = allSymbolAssignments
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
    , recursionDepth = 0
    , startingPoint = ( 250, 250 )
    , startingAngle = 0
    , polygonFillColor = Color.black
    , colorPicker = ColorPicker.empty
    , generatedSequence = Array.empty
    , drawnTurtle = False
    , canvasWidth = 500
    , canvasHeight = 500
    , showSidebar = True
    , selectedPreset = plant1
    , presets = presets
    , randomGenerator = Random.int 0 (List.length presets - 1)
    , renderingProgress = 0
    , animationSpeed = 1
    , animationStartTime = Nothing
    , loadingIconVisible = False
    , lastAnimationFrameTimestamp = Nothing
    , selectSymbol = Select.init "symbol-select" |> Select.setItems allSymbolAssignments
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
