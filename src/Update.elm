module Update exposing (Msg(..), update)

import LSys exposing (generateSequence)
import Model exposing (Model)
import Turtle exposing (Action(..))


type Msg
    = AddSymbolAssignment String Action
    | SelectAction String
    | SelectSymbol String
    | SelectAxiom String
    | UpdateNewRuleInput String
    | UpdateAngle Float
    | UpdateStepSize Float
    | UpdateIterations Int
    | UpdateStartingPointX String
    | UpdateStartingPointY String
    | UpdateStartingAngle Float
    | AddRule
    | AssignSymbol
    | ApplyAxiom
    | DrawTurtle


update : Msg -> Model -> Model
update msg model =
    case msg of
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

        SelectAction actionStr ->
            { model | selectedAction = parseAction actionStr }

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

        UpdateAngle angle ->
            { model | angle = angle }

        UpdateStepSize newSize ->
            { model | stepSize = newSize }

        UpdateIterations newIterations ->
            { model | iterations = newIterations }

        UpdateStartingPointX value ->
            { model | startingPoint = ( Maybe.withDefault 0 (String.toFloat value), Tuple.second model.startingPoint ) }

        UpdateStartingPointY value ->
            { model | startingPoint = ( Tuple.first model.startingPoint, Maybe.withDefault 0 (String.toFloat value) ) }

        UpdateStartingAngle newStartingAngle ->
            { model | startingAngle = newStartingAngle }

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


parseAction : String -> Action
parseAction str =
    case str of
        "Move" ->
            Move

        "TurnLeft" ->
            TurnLeft

        "TurnRight" ->
            TurnRight

        "Push" ->
            Push

        "Pop" ->
            Pop

        "NoAction" ->
            NoAction 
        _ -> 
            Move 
