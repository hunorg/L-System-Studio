module Update exposing (Msg(..), update)

import Array
import ColorPicker
import Html.Events.Extra.Mouse as Mouse
import LSys exposing (generateSequence)
import List.Extra
import Model exposing (Model, Preset, Rule)
import Process
import Random
import Task
import Time
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
    | UpdateCanvasSize Float Float
    | ToggleSidebar
    | Reset
    | GetRandomPreset
    | SetRandomPreset Int
    | LoadRandomPreset Preset
    | Animate Time.Posix
    | SetAnimationStartTime Time.Posix
    | StartAnimation
    | ShowLoadingIcon
    | HideLoadingIconAfter Float
    | AnimationFrame Time.Posix
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

        UpdateCanvasSize newWidth newHeight ->
            ( { model | canvasWidth = newWidth, canvasHeight = newHeight }
            , Cmd.none
            )

        ToggleSidebar ->
            ( { model | showSidebar = not model.showSidebar }, Cmd.none )

        Reset ->
            ( { model
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
                , iterations = 0
                , startingAngle = 0
                , generatedSequence = Array.empty
                , drawnTurtle = False
                , renderingProgress = 0
                , animationStartTime = Nothing
              }
            , Cmd.none
            )

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
                        , renderingProgress = 0
                        , animationStartTime = Nothing
                    }
            in
            ( { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules, drawnTurtle = True }
            , Task.perform SetAnimationStartTime Time.now
            )

        Animate posix ->
            case model.animationStartTime of
                Nothing ->
                    ( model, Cmd.none )

                Just startTime ->
                    let
                        elapsedTimeMillis =
                            Time.posixToMillis posix - Time.posixToMillis startTime

                        maxProgress =
                            Array.length model.generatedSequence

                        newProgress =
                            model.renderingProgress + (toFloat elapsedTimeMillis / 100 * model.animationSpeed)

                        animationFinished =
                            newProgress >= toFloat maxProgress
                    in
                    ( { model
                        | renderingProgress = min (toFloat maxProgress) newProgress
                        , loadingIconVisible = not animationFinished
                        , lastAnimationFrameTimestamp = Just posix
                      }
                    , Cmd.none
                    )

        SetAnimationStartTime time ->
            ( { model | animationStartTime = Just time }, Cmd.none )

        StartAnimation ->
            let
                animationTime =
                    toFloat (Array.length model.generatedSequence) / model.animationSpeed * 1000

                newModel =
                    { model
                        | rules = model.rules
                        , axiom = model.axiom
                        , axiomApplied = model.axiomApplied
                        , turningAngleIncrement = model.turningAngleIncrement
                        , turningAngle = model.turningAngle
                        , lineLength = model.lineLength
                        , lineLengthScale = model.lineLengthScale
                        , lineWidthIncrement = model.lineWidthIncrement
                        , iterations = model.iterations
                        , startingAngle = model.startingAngle
                        , startingPoint = ( roundFloat 0 (model.canvasWidth / 2.3), roundFloat 0 (model.canvasHeight / 1.5) )
                        , renderingProgress = 0
                        , animationStartTime = Nothing
                        , loadingIconVisible = True -- Add this line to show the loading icon
                    }
            in
            ( { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules, drawnTurtle = True }
            , Cmd.batch [ Task.perform SetAnimationStartTime Time.now, Task.perform HideLoadingIconAfter (Process.sleep animationTime |> Task.map (always 1)) ]
            )

        ShowLoadingIcon ->
            ( { model | loadingIconVisible = True }, Cmd.none )

        HideLoadingIconAfter _ ->
            ( { model | loadingIconVisible = False }, Cmd.none )

        AnimationFrame posix ->
            case model.lastAnimationFrameTimestamp of
                Nothing ->
                    ( { model | lastAnimationFrameTimestamp = Just posix }, Cmd.none )

                Just lastTimestamp ->
                    let
                        deltaTime =
                            Time.posixToMillis posix - Time.posixToMillis lastTimestamp

                        newProgress =
                            model.renderingProgress + (toFloat deltaTime / 1 * model.animationSpeed)

                        maxProgress =
                            Array.length model.generatedSequence
                    in
                    ( { model
                        | renderingProgress = min (toFloat maxProgress) newProgress
                        , lastAnimationFrameTimestamp = Just posix
                      }
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
