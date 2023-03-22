module Update exposing (Msg(..), update)

import LSys exposing (generateSequence)
import Model exposing (Model)
import Turtle exposing (Action(..))
import ColorPicker


type Msg
    = AddSymbolAssignment String Action
    | ToggleSyntaxDisplay
    | SelectSymbol String
    | SelectAxiom String
    | UpdateNewRuleInput String
    | UpdateAngle Float
    | UpdateLineLength Float
    | UpdateLineLengthScale Float
    | UpdateLineWidthIncrement Float
    | UpdateIterations Int
    | UpdateStartingPointX String
    | UpdateStartingPointY String
    | UpdateStartingAngle Float
    | ColorPickerMsg ColorPicker.Msg
    | AddRule
    | AssignSymbol
    | ApplyAxiom
    | DrawTurtle


update : Msg -> Model -> Model
update msg model =
    case msg of
        ToggleSyntaxDisplay ->
            { model | syntaxDisplay = not model.syntaxDisplay }

        AddSymbolAssignment characterString action ->
            let
                updatedAssignments =
                    case List.filter (\s -> s.character == characterString) model.symbolAssignments of
                        [] ->
                            model.symbolAssignments ++ [ { character = characterString, action = action } ]

                        _ ->
                            List.map
                                (\s ->
                                    if s.character == characterString then
                                        { s | action = action }

                                    else
                                        s
                                )
                                model.symbolAssignments
            in
            { model | symbolAssignments = updatedAssignments }

        AssignSymbol ->
            let
                updatedAssignments =
                    case List.filter (\s -> s.character == model.selectedSymbol) model.symbolAssignments of
                        [] ->
                            model.symbolAssignments ++ [ { character = model.selectedSymbol, action = model.selectedAction } ]

                        _ ->
                            List.map
                                (\s ->
                                    if s.character == model.selectedSymbol then
                                        { s | action = model.selectedAction }

                                    else
                                        s
                                )
                                model.symbolAssignments
            in
            { model | symbolAssignments = updatedAssignments }

        SelectSymbol character ->
            { model | selectedSymbol = character }

        SelectAxiom newAxiom ->
            { model | axiom = newAxiom }

        UpdateNewRuleInput input ->
            { model | newRuleInput = input }

        UpdateAngle turningAngle ->
            { model | turningAngle = turningAngle }

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
