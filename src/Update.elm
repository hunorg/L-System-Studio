module Update exposing (Msg(..), update)

import LSys exposing (generateSequence)
import Model exposing (Model)
import Turtle exposing (Action(..))
import ColorPicker



type Msg
    = ToggleSyntaxDisplay
    | SelectSymbol String
    | SelectAxiom String
    | UpdateNewRuleInput String
    | UpdateAngle Float
    | UpdateTurningAngleIncrement Float 
    | UpdateLineLength Float
    | UpdateLineLengthScale Float
    | UpdateLineWidthIncrement Float
    | UpdateIterations Int
    | UpdateStartingPointX String
    | UpdateStartingPointY String
    | UpdateStartingAngle Float
    | ColorPickerMsg ColorPicker.Msg
    | AddRule
    | ApplyAxiom
    | DrawTurtle
    | UpdateCanvasSize Float Float
    | NoOp
 --   | ResizeSvg Int Int 


update : Msg -> Model -> (Model, Cmd msg)
update msg model =
    case msg of
        ToggleSyntaxDisplay ->
           ( { model | syntaxDisplay = not model.syntaxDisplay }, Cmd.none)

        
        
        SelectSymbol character ->
           ( { model | selectedSymbol = character }, Cmd.none)

        SelectAxiom newAxiom ->
           ( { model | axiom = newAxiom }, Cmd.none)

        UpdateNewRuleInput input ->
           ( { model | newRuleInput = input }, Cmd.none)

        UpdateAngle turningAngle ->
           ( { model | turningAngle = turningAngle }, Cmd.none)

        UpdateTurningAngleIncrement newTurningAngleIncrement -> 
           ( { model | turningAngleIncrement = newTurningAngleIncrement }, Cmd.none)

        UpdateLineLength newLength ->
           ( { model | lineLength = newLength }, Cmd.none)

        UpdateLineLengthScale newLengthScale ->
           ( { model | lineLengthScale = newLengthScale }, Cmd.none)

        UpdateLineWidthIncrement newIncrementSize ->
           ( { model | lineWidthIncrement = newIncrementSize }, Cmd.none)

        UpdateIterations newIterations ->
           ( { model | iterations = newIterations }, Cmd.none)

        UpdateStartingPointX value ->
           ( { model | startingPoint = ( Maybe.withDefault 0 (String.toFloat value), Tuple.second model.startingPoint ) }, Cmd.none)

        UpdateStartingPointY value ->
          (  { model | startingPoint = ( Tuple.first model.startingPoint, Maybe.withDefault 0 (String.toFloat value) ) }, Cmd.none)

        UpdateStartingAngle newStartingAngle ->
          (  { model | startingAngle = newStartingAngle }, Cmd.none)

        ColorPickerMsg colorPickerMsg ->
            let
                ( newColorPicker, newColorMaybe ) =
                    ColorPicker.update colorPickerMsg model.polygonFillColor model.colorPicker
            in
            ( { model
                | colorPicker = newColorPicker
                , polygonFillColor = Maybe.withDefault model.polygonFillColor newColorMaybe
              }, Cmd.none)
           

        AddRule ->
            let
                newRule =
                    ( String.uncons model.selectedSymbol |> Maybe.map Tuple.first |> Maybe.withDefault ' ', String.toList model.newRuleInput )

                newModel =
                    { model | rules = model.rules ++ [ newRule ], newRuleInput = "" }
            in
           ( { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules }, Cmd.none)

        ApplyAxiom ->
           ( { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, axiomApplied = True }, Cmd.none)

        DrawTurtle ->
           ( { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, drawnTurtle = True }, Cmd.none)

        UpdateCanvasSize newWidth newHeight ->
            ( { model | canvasWidth = newWidth, canvasHeight = newHeight }
            , Cmd.none
            )

        NoOp -> 
            (model , Cmd.none)

   {-     ResizeSvg width _ ->
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