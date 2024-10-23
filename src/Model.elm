module Model exposing (Flags, Model, init)

import Array exposing (Array)
import Color
import ColorPicker
import Presets exposing (..)
import Select exposing (Select)
import SymbolAssignments exposing (Rule, Symbol, allSymbolAssignments)
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
    , selectedPreset : Select Preset
    , presets : List Preset
    , renderingProgress : Float
    , animationSpeed : Float
    , animationStartTime : Maybe Time.Posix
    , loadingIconVisible : Bool
    , lastAnimationFrameTimestamp : Maybe Time.Posix
    , selectSymbol : Select Symbol
    , windowWidth : Int
    , windowHeight : Int
    }


type alias Flags =
    { width : Int
    , height : Int
    }


init : Flags -> ( Model, Cmd msg )
init flags =
    ( { symbolAssignments = allSymbolAssignments
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
      , selectedPreset = Select.init "preset-select" |> Select.setItems presets
      , presets = presets
      , renderingProgress = 0
      , animationSpeed = 1
      , animationStartTime = Nothing
      , loadingIconVisible = False
      , lastAnimationFrameTimestamp = Nothing
      , selectSymbol = Select.init "symbol-select" |> Select.setItems allSymbolAssignments
      , windowWidth = flags.width
      , windowHeight = flags.height
      }
    , Cmd.none
    )
