module Update exposing (Msg(..), update)

import Array
import ColorPicker
import Html.Events.Extra.Mouse as Mouse
import LSys exposing (generateSequence)
import Model exposing (Model)
import Presets exposing (Preset)
import Process
import Select
import SymbolAssignments exposing (Rule, Symbol, allSymbolAssignments)
import Task
import Time
import Turtle exposing (Action(..))


type Msg
    = ToggleSyntaxDisplay
    | UpdateAxiomInput String
    | UpdateNewRuleInput String
    | SelectRule Rule
    | RemoveRule Rule
    | UpdateTurningAngle String
    | UpdateTurningAngleIncrement String
    | UpdateLineLength Float
    | UpdateLineLengthScale Float
    | UpdateLineWidthIncrement Float
    | UpdateRecursionDepth Float
    | UpdateStartingPoint Mouse.Button ( Float, Float )
    | UpdateStartingAngle String
    | ColorPickerMsg ColorPicker.Msg
    | AddRule
    | ApplyAxiom
    | UpdateCanvasSize Float Float
    | ToggleSidebar
    | Reset
    | LoadPreset Preset
    | Animate Time.Posix
    | SetAnimationStartTime Time.Posix
    | StartAnimation
    | ShowLoadingIcon
    | HideLoadingIconAfter Float
    | AnimationFrame Time.Posix
    | SelectSymbol (Select.Msg Symbol)
    | SelectPreset (Select.Msg Preset)
    | Resize ( Int, Int )
    | NoOp



--   | ResizeSvg Int Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg state =
    case msg of
        ToggleSyntaxDisplay ->
            ( { state | syntaxDisplay = not state.syntaxDisplay }, Cmd.none )

        UpdateAxiomInput newAxiom ->
            ( { state | axiom = newAxiom }, Cmd.none )

        UpdateNewRuleInput input ->
            ( { state | newRuleInput = input }, Cmd.none )

        SelectRule rule ->
            ( { state | selectedRule = Just rule }, Cmd.none )

        RemoveRule rule ->
            ( { state | rules = List.filter ((/=) rule) state.rules, selectedRule = Nothing }, Cmd.none )

        UpdateTurningAngle turningAngle ->
            ( { state | turningAngle = turningAngle |> String.toFloat |> Maybe.withDefault 0 }, Cmd.none )

        UpdateTurningAngleIncrement newTurningAngleIncrement ->
            ( { state | turningAngleIncrement = newTurningAngleIncrement |> String.toFloat |> Maybe.withDefault 0 }, Cmd.none )

        UpdateLineLength newLength ->
            ( { state | lineLength = roundFloat 2 newLength }, Cmd.none )

        UpdateLineLengthScale newLengthScale ->
            ( { state | lineLengthScale = roundFloat 2 newLengthScale }, Cmd.none )

        UpdateLineWidthIncrement newIncrementSize ->
            ( { state | lineWidthIncrement = roundFloat 2 newIncrementSize }, Cmd.none )

        UpdateRecursionDepth newRecursionDepth ->
            ( { state | recursionDepth = roundFloat 0 newRecursionDepth }, Cmd.none )

        UpdateStartingPoint button clientPos ->
            if button == Mouse.MainButton then
                ( { state | startingPoint = ( Tuple.first clientPos, Tuple.second clientPos ) }, Cmd.none )

            else
                ( state, Cmd.none )

        UpdateStartingAngle newStartingAngle ->
            ( { state | startingAngle = newStartingAngle |> String.toFloat |> Maybe.withDefault 0 }, Cmd.none )

        ColorPickerMsg colorPickerMsg ->
            let
                ( newColorPicker, newColorMaybe ) =
                    ColorPicker.update colorPickerMsg state.polygonFillColor state.colorPicker
            in
            ( { state
                | colorPicker = newColorPicker
                , polygonFillColor = Maybe.withDefault state.polygonFillColor newColorMaybe
              }
            , Cmd.none
            )

        AddRule ->
            let
                newRule =
                    ( String.uncons state.selectedSymbol |> Maybe.map Tuple.first |> Maybe.withDefault ' ', String.toList state.newRuleInput )

                newState =
                    { state | rules = state.rules ++ [ newRule ], newRuleInput = "" }
            in
            ( { newState | generatedSequence = generateSequence newState.recursionDepth newState.axiom newState.rules }, Cmd.none )

        ApplyAxiom ->
            ( { state | generatedSequence = generateSequence state.recursionDepth state.axiom state.rules, axiomApplied = True }, Cmd.none )

        UpdateCanvasSize newWidth newHeight ->
            ( { state | canvasWidth = newWidth, canvasHeight = newHeight }
            , Cmd.none
            )

        ToggleSidebar ->
            ( { state | showSidebar = not state.showSidebar }, Cmd.none )

        Reset ->
            ( { state
                | syntaxDisplay = False
                , rules = []
                , selectedRule = Nothing
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
                , startingAngle = 0
                , generatedSequence = Array.empty
                , drawnTurtle = False
                , renderingProgress = 0
                , animationStartTime = Nothing
                , selectedPreset = Select.init "preset-select" |> Select.setItems Presets.presets
                , selectSymbol = Select.init "symbol-select" |> Select.setItems allSymbolAssignments
              }
            , Task.perform HideLoadingIconAfter (Process.sleep 1 |> Task.map (always 1))
            )

        LoadPreset preset ->
            let
                newState =
                    { state
                        | rules = preset.rules
                        , axiomApplied = preset.axiomApplied
                        , turningAngle = preset.turningAngle
                        , lineLength = preset.lineLength
                        , axiom = preset.axiom
                        , recursionDepth = preset.iterations
                        , startingAngle = preset.startingAngle
                        , startingPoint = ( roundFloat 0 (state.canvasWidth / 2.3), roundFloat 0 (state.canvasHeight / 1.5) )
                        , renderingProgress = 0
                        , animationStartTime = Nothing
                    }
            in
            ( { newState | generatedSequence = generateSequence newState.recursionDepth newState.axiom newState.rules, drawnTurtle = True }
            , Task.perform SetAnimationStartTime Time.now
            )

        Animate posix ->
            case state.animationStartTime of
                Nothing ->
                    ( state, Cmd.none )

                Just startTime ->
                    let
                        elapsedTimeMillis =
                            Time.posixToMillis posix - Time.posixToMillis startTime

                        maxProgress =
                            Array.length state.generatedSequence

                        newProgress =
                            state.renderingProgress + (toFloat elapsedTimeMillis / 100 * state.animationSpeed)

                        animationFinished =
                            newProgress >= toFloat maxProgress
                    in
                    ( { state
                        | renderingProgress = min (toFloat maxProgress) newProgress
                        , loadingIconVisible = not animationFinished
                        , lastAnimationFrameTimestamp = Just posix
                      }
                    , Cmd.none
                    )

        SetAnimationStartTime time ->
            ( { state | animationStartTime = Just time }, Cmd.none )

        StartAnimation ->
            let
                animationTime =
                    toFloat (Array.length state.generatedSequence) / state.animationSpeed * 1000

                newState =
                    { state
                        | rules = state.rules
                        , axiom = state.axiom
                        , axiomApplied = state.axiomApplied
                        , turningAngleIncrement = state.turningAngleIncrement
                        , turningAngle = state.turningAngle
                        , lineLength = state.lineLength
                        , lineLengthScale = state.lineLengthScale
                        , lineWidthIncrement = state.lineWidthIncrement
                        , recursionDepth = state.recursionDepth
                        , startingAngle = state.startingAngle
                        , startingPoint = ( roundFloat 0 (state.canvasWidth / 2.3), roundFloat 0 (state.canvasHeight / 1.5) )
                        , renderingProgress = 0
                        , animationStartTime = Nothing
                        , loadingIconVisible = True
                    }
            in
            ( { newState | generatedSequence = generateSequence newState.recursionDepth newState.axiom newState.rules, drawnTurtle = True }
            , Cmd.batch [ Task.perform SetAnimationStartTime Time.now, Task.perform HideLoadingIconAfter (Process.sleep animationTime |> Task.map (always 1)) ]
            )

        ShowLoadingIcon ->
            ( { state | loadingIconVisible = True }, Cmd.none )

        HideLoadingIconAfter _ ->
            ( { state | loadingIconVisible = False }, Cmd.none )

        AnimationFrame posix ->
            case state.lastAnimationFrameTimestamp of
                Nothing ->
                    ( { state | lastAnimationFrameTimestamp = Just posix }, Cmd.none )

                Just lastTimestamp ->
                    let
                        deltaTime =
                            Time.posixToMillis posix - Time.posixToMillis lastTimestamp

                        newProgress =
                            state.renderingProgress + (toFloat deltaTime / 1 * state.animationSpeed)

                        maxProgress =
                            Array.length state.generatedSequence
                    in
                    ( { state
                        | renderingProgress = min (toFloat maxProgress) newProgress
                        , lastAnimationFrameTimestamp = Just posix
                      }
                    , Cmd.none
                    )

        SelectSymbol subMsg ->
            Select.update SelectSymbol subMsg state.selectSymbol
                |> Tuple.mapFirst
                    (\select ->
                        { state
                            | selectSymbol = select
                            , selectedSymbol =
                                case select |> Select.toValue of
                                    Just symbol ->
                                        symbol.character

                                    Nothing ->
                                        ""
                        }
                    )

        SelectPreset subMsg ->
            let
                ( updatedSelect, cmd ) =
                    Select.update SelectPreset subMsg state.selectedPreset

                updatedState =
                    { state | selectedPreset = updatedSelect }

                maybePreset =
                    Select.toValue updatedState.selectedPreset

                currentPreset =
                    Select.toValue state.selectedPreset

                createFinalState preset =
                    let
                        updatedModelWithPreset =
                            { updatedState
                                | rules = preset.rules
                                , axiomApplied = preset.axiomApplied
                                , turningAngle = preset.turningAngle
                                , lineLength = preset.lineLength
                                , axiom = preset.axiom
                                , recursionDepth = preset.iterations
                                , startingAngle = preset.startingAngle
                                , startingPoint = ( roundFloat 0 (state.canvasWidth / 2.3), roundFloat 0 (state.canvasHeight / 1.5) )
                                , renderingProgress = 0
                                , animationStartTime = Nothing
                            }

                        finalState =
                            { updatedModelWithPreset
                                | generatedSequence = generateSequence updatedModelWithPreset.recursionDepth updatedModelWithPreset.axiom updatedModelWithPreset.rules
                                , drawnTurtle = True
                            }
                    in
                    ( finalState, Task.perform SetAnimationStartTime Time.now )

                ( newState, task ) =
                    case ( maybePreset, currentPreset ) of
                        ( Just preset, Just existingPreset ) ->
                            if existingPreset == preset then
                                ( updatedState, Cmd.none )

                            else
                                createFinalState preset

                        ( Just preset, Nothing ) ->
                            createFinalState preset

                        _ ->
                            ( updatedState, Cmd.none )
            in
            ( newState, Cmd.batch [ cmd, task ] )

        Resize ( newWidth, newHeight ) ->
            ( { state | windowWidth = newWidth, windowHeight = newHeight }, Cmd.none )

        NoOp ->
            ( state, Cmd.none )


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
