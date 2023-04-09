module Update exposing (Msg(..), update)

import ColorPicker
import Html.Events.Extra.Mouse as Mouse
import LSys exposing (generateSequence)
import List.Extra
import Model exposing (Model, Preset, Rule, init)
import Random
import Task
import Turtle exposing (Action(..))


type Msg
    = ToggleSyntaxDisplay
    | SelectSymbol String
    | SelectAxiom String
    | UpdateNewRuleInput String
    | SelectRule Rule
    | RemoveRule Rule
    | UpdateAngle Float
    | UpdateTurningAngleIncrement Float
    | UpdateLineLength Float
    | UpdateLineLengthScale Float
    | UpdateLineWidthIncrement Float
    | UpdateIterations Float
    | DownMsg Mouse.Button ( Float, Float )
    | UpdateStartingAngle Float
    | ColorPickerMsg ColorPicker.Msg
    | AddRule
    | ApplyAxiom
    | DrawTurtle
    | UpdateCanvasSize Float Float
    | ToggleSidebar
    | Reset
    | GetRandomPreset
    | SetRandomPreset Int
    | LoadRandomPreset Preset
    | NoOp



--   | ResizeSvg Int Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleSyntaxDisplay ->
            ( { model | syntaxDisplay = not model.syntaxDisplay }, Cmd.none )

        SelectSymbol character ->
            ( { model | selectedSymbol = character }, Cmd.none )

        SelectAxiom newAxiom ->
            ( { model | axiom = newAxiom }, Cmd.none )

        UpdateNewRuleInput input ->
            ( { model | newRuleInput = input }, Cmd.none )

        SelectRule rule ->
            ( { model | selectedRule = Just rule }, Cmd.none )

        RemoveRule rule ->
            ( { model | rules = List.filter ((/=) rule) model.rules, selectedRule = Nothing }, Cmd.none )

        UpdateAngle turningAngle ->
            ( { model | turningAngle = turningAngle }, Cmd.none )

        UpdateTurningAngleIncrement newTurningAngleIncrement ->
            ( { model | turningAngleIncrement = newTurningAngleIncrement }, Cmd.none )

        UpdateLineLength newLength ->
            ( { model | lineLength = newLength }, Cmd.none )

        UpdateLineLengthScale newLengthScale ->
            ( { model | lineLengthScale = newLengthScale }, Cmd.none )

        UpdateLineWidthIncrement newIncrementSize ->
            ( { model | lineWidthIncrement = newIncrementSize }, Cmd.none )

        UpdateIterations newIterations ->
            ( { model | iterations = newIterations }, Cmd.none )

        DownMsg button clientPos ->
            if button == Mouse.MainButton then
                ( { model | startingPoint = ( Tuple.first clientPos, Tuple.second clientPos ) }, Cmd.none )

            else
                ( model, Cmd.none )

        UpdateStartingAngle newStartingAngle ->
            ( { model | startingAngle = newStartingAngle }, Cmd.none )

        ColorPickerMsg colorPickerMsg ->
            let
                ( newColorPicker, newColorMaybe ) =
                    ColorPicker.update colorPickerMsg model.polygonFillColor model.colorPicker
            in
            ( { model
                | colorPicker = newColorPicker
                , polygonFillColor = Maybe.withDefault model.polygonFillColor newColorMaybe
              }
            , Cmd.none
            )

        AddRule ->
            let
                newRule =
                    ( String.uncons model.selectedSymbol |> Maybe.map Tuple.first |> Maybe.withDefault ' ', String.toList model.newRuleInput )

                newModel =
                    { model | rules = model.rules ++ [ newRule ], newRuleInput = "" }
            in
            ( { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules }, Cmd.none )

        ApplyAxiom ->
            ( { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, axiomApplied = True }, Cmd.none )

        DrawTurtle ->
            ( { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, drawnTurtle = True }, Cmd.none )

        UpdateCanvasSize newWidth newHeight ->
            ( { model | canvasWidth = newWidth, canvasHeight = newHeight }
            , Cmd.none
            )

        ToggleSidebar ->
            ( { model | showSidebar = not model.showSidebar }, Cmd.none )

        Reset ->
            ( init, Cmd.none )

        GetRandomPreset ->
            ( model, Random.generate SetRandomPreset model.randomGenerator )

        SetRandomPreset index ->
            let
                newSelectedPreset =
                    List.Extra.getAt index model.presets |> Maybe.withDefault Model.initPreset
            in
            ( { model | selectedPreset = newSelectedPreset }
            , Task.perform LoadRandomPreset (Task.succeed newSelectedPreset)
            )

        LoadRandomPreset preset ->
            let
                newModel =
                    { model
                        | rules = preset.rules
                        , axiomApplied = preset.axiomApplied
                        , turningAngle = preset.turningAngle
                        , lineLength = preset.lineLength
                        , axiom = preset.axiom
                        , iterations = preset.iterations
                        , startingAngle = preset.startingAngle
                        , startingPoint = ( roundFloat 0 (model.canvasWidth / 2.3), roundFloat 0 (model.canvasHeight / 1.5) )
                    }
            in
            ( { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules, drawnTurtle = True }
            , Cmd.none
            )

        NoOp ->
            ( model, Cmd.none )


roundFloat : Int -> Float -> Float
roundFloat decimalPlaces number =
    let
        factor =
            toFloat (10 ^ decimalPlaces)
    in
    toFloat (round (number * factor)) / factor



{- ResizeSvg width _ ->
   ( { model
        | svgWidth = width
        , svgHeight = ((toFloat width) * (595.5/940)) |> round
    }, Cmd.none )

-}
{-
   subscriptions : Model -> Sub Msg
   subscriptions _ =
       Browser.Events.onResize (\w h -> ResizeSvg w h)
-}
