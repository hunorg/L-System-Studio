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


update : Msg -> Model -> Model
update msg model =
    case msg of
        ToggleSyntaxDisplay ->
            { model | syntaxDisplay = not model.syntaxDisplay }

        
        
        SelectSymbol character ->
            { model | selectedSymbol = character }

        SelectAxiom newAxiom ->
            { model | axiom = newAxiom }

        UpdateNewRuleInput input ->
            { model | newRuleInput = input }

        UpdateAngle turningAngle ->
            { model | turningAngle = turningAngle }

        UpdateTurningAngleIncrement newTurningAngleIncrement -> 
            { model | turningAngleIncrement = newTurningAngleIncrement }

        UpdateLineLength newLength ->
            { model | lineLength = newLength }

        UpdateLineLengthScale newLengthScale ->
            { model | lineLengthScale = newLengthScale }

        UpdateLineWidthIncrement newIncrementSize ->
            { model | lineWidthIncrement = newIncrementSize }

        UpdateIterations newIterations ->
            { model | iterations = newIterations }

        UpdateStartingPointX value ->
            { model | startingPoint = ( Maybe.withDefault 0 (String.toFloat value), Tuple.second model.startingPoint ) }

        UpdateStartingPointY value ->
            { model | startingPoint = ( Tuple.first model.startingPoint, Maybe.withDefault 0 (String.toFloat value) ) }

        UpdateStartingAngle newStartingAngle ->
            { model | startingAngle = newStartingAngle }

        ColorPickerMsg colorPickerMsg ->
            let
                ( newColorPicker, newColorMaybe ) =
                    ColorPicker.update colorPickerMsg model.polygonFillColor model.colorPicker
            in
             { model
                | colorPicker = newColorPicker
                , polygonFillColor = Maybe.withDefault model.polygonFillColor newColorMaybe
              } 
           

        AddRule ->
            let
                newRule =
                    ( String.uncons model.selectedSymbol |> Maybe.map Tuple.first |> Maybe.withDefault ' ', String.toList model.newRuleInput )

                newModel =
                    { model | rules = model.rules ++ [ newRule ], newRuleInput = "" }
            in
            { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules }

        ApplyAxiom ->
            { model | generatedSequence = generateSequence model.iterations model.axiom model.rules }

        DrawTurtle ->
            { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, drawnTurtle = True }

