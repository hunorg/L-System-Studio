module View exposing (..)

import Html exposing (Html, button, div, h2, input, option, select, text)
import Html.Attributes exposing (placeholder, step, type_, value)
import Html.Events exposing (onClick, onInput)
import LSys exposing (generateTurtle)
import Model exposing (Model, Symbol)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Length(..))
import Update exposing (..)


startingPointInput : ( Float, Float ) -> Html Msg
startingPointInput ( x, y ) =
    Html.div []
        [ Html.input [ placeholder "X", value (String.fromFloat x), onInput UpdateStartingPointX ] []
        , Html.input [ placeholder "Y", value (String.fromFloat y), onInput UpdateStartingPointY ] []
        ]


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


view : Model -> Html Msg
view model =
    div []
        [ h2 [] [ text "Add Symbol Assignment" ]
        , input [ type_ "text", onInput SelectSymbol ] []
        , select [ onInput SelectAction ] (List.map optionView actionOptions)
        , button [ onClick <| AddSymbolAssignment model.selectedSymbol model.selectedAction ] [ text "Assign" ]
        , div [] (List.map symbolAssignmentView model.symbolAssignments) -- Add this line
        , h2 [] [ text "Rules" ]
        , select [ onInput SelectSymbol ] (List.map symbolOptionView model.symbolAssignments)
        , text " -> "
        , input [ type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ] []
        , button [ onClick AddRule ] [ text "Add Rule" ]
        , div []
            [ text "Rules: "
            , text <| String.join ", " <| List.map showRule model.rules
            ]
        , h2 [] [ text "Angle" ]
        , input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.angle), Html.Attributes.style "width" "360px" ] []
        , text (String.fromFloat model.angle ++ "°")
        , h2 [] [ text "Step Size" ]
        , input [ type_ "range", Html.Attributes.min "1", Html.Attributes.max "10", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateStepSize), value (String.fromFloat model.stepSize) ] []
        , text (String.fromFloat model.stepSize)
        , h2 [] [ text "Axiom" ]
        , input [ type_ "text", onInput SelectAxiom ] []
        , button [ onClick ApplyAxiom ] [ text "Apply Axiom" ]
        , text ("Axiom: " ++ model.axiom)
        , h2 [] [ text "Iterations" ]
        , input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
        , text (String.fromInt model.iterations)
        , h2 [] [ text "Starting Point" ]
        , startingPointInput model.startingPoint
        , h2 [] [ text "Starting Angle" ]
        , input [ type_ "range", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle), Html.Attributes.style "width" "360px" ] []
        , text (String.fromFloat model.startingAngle ++ "°")
        , div []
            [ button [ onClick DrawTurtle ] [ text "Draw" ] ]
        , svg [ viewBox 0 0 1000 1000, TypedSvg.Attributes.width (Px 1000), TypedSvg.Attributes.height (Px 1000) ]
            (if model.drawnTurtle then
                Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.stepSize model.angle

             else
                []
            )
        ]


symbolAssignmentView : Symbol -> Html msg
symbolAssignmentView symbol =
    div []
        [ text (symbol.character ++ ": ")
        , text
            (case symbol.action of
                Move ->
                    "Move"

                TurnLeft ->
                    "TurnLeft"

                TurnRight ->
                    "TurnRight"

                Push ->
                    "Push"

                Pop ->
                    "Pop"

                NoAction ->
                    "NoAction"
            )
        ]


optionView : Action -> Html msg
optionView action =
    let
        actionStr =
            case action of
                Move ->
                    "Move"

                TurnLeft ->
                    "TurnLeft"

                TurnRight ->
                    "TurnRight"

                Push ->
                    "Push"

                Pop ->
                    "Pop"

                NoAction ->
                    "NoAction"
    in
    option [ value actionStr ] [ text actionStr ]


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


actionOptions : List Action
actionOptions =
    [ Move, TurnLeft, TurnRight, Push, Pop, NoAction]
