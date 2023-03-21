module View exposing (..)

import Color exposing (lightBlue, red)
import Html exposing (Html, button, div, h2, input, option, select, text)
import Html.Attributes exposing (placeholder, step, type_, value)
import Html.Events exposing (onClick, onInput)
import LSys exposing (generateTurtle)
import Model exposing (Model, Symbol)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Length(..), Paint(..))
import Update exposing (..)


startingPointInput : ( Float, Float ) -> Html Msg
startingPointInput ( x, y ) =
    let
        startingPointInputStyle =
            [ Html.Attributes.style "border" "1px solid #ced4da"
            , Html.Attributes.style "padding" "0.375rem 0.75rem"
            , Html.Attributes.style "border-radius" "4px"
            , Html.Attributes.style "background-color" "white"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "line-height" "1.5"
            , Html.Attributes.style "color" "#495057"
            , Html.Attributes.style "width" "4rem"
            , Html.Attributes.style "margin" "0.5rem"
            ]

        labelStyle =
            [ Html.Attributes.style "font-weight" "bold"
            , Html.Attributes.style "color" "#333"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "padding" "0.5rem"
            , Html.Attributes.style "margin" "0.5rem"
            ]
    in
    Html.div []
        [ Html.label labelStyle [ text "X: " ]
        , Html.input (startingPointInputStyle ++ [ placeholder "X", value (String.fromFloat x), onInput UpdateStartingPointX ]) []
        , Html.label labelStyle [ text "Y: " ]
        , Html.input (startingPointInputStyle ++ [ placeholder "Y", value (String.fromFloat y), onInput UpdateStartingPointY ]) []
        ]


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


view : Model -> Html Msg
view model =
    let
        appStyle =
            [ Html.Attributes.style "font-family" "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            , Html.Attributes.style "font-size" "16px"
            , Html.Attributes.style "background-color" "#f8f9fa"
            , Html.Attributes.style "padding" "2rem"
            , Html.Attributes.style "width" "500px" -- set a specific width, adjust the value as needed
            , Html.Attributes.style "box-sizing" "border-box"
            ]

        labelStyle =
            [ Html.Attributes.style "font-weight" "bold"
            , Html.Attributes.style "color" "#333"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "padding" "0.5rem"
            , Html.Attributes.style "margin" "0.5rem"
            ]

        sectionStyle =
            [ Html.Attributes.style "padding" "1rem"
            , Html.Attributes.style "margin-bottom" "1rem"
            , Html.Attributes.style "border-bottom" "1px solid #ccc"
            ]

        buttonStyle =
            [ Html.Attributes.style "background-color" "#007BFF"
            , Html.Attributes.style "border" "none"
            , Html.Attributes.style "color" "white"
            , Html.Attributes.style "padding" "0.5rem 1rem"
            , Html.Attributes.style "margin-top" "1rem"
            , Html.Attributes.style "cursor" "pointer"
            , Html.Attributes.style "border-radius" "4px"
            ]

        dropdownStyle =
            [ Html.Attributes.style "border" "1px solid #ced4da"
            , Html.Attributes.style "padding" "0.375rem 0.75rem"
            , Html.Attributes.style "border-radius" "4px"
            , Html.Attributes.style "background-color" "white"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "line-height" "1.5"
            , Html.Attributes.style "color" "#495057"
            , Html.Attributes.style "width" "auto"
            , Html.Attributes.style "margin" "0.5rem"
            , Html.Attributes.style "cursor" "pointer"
            ]

        inputStyle =
            [ Html.Attributes.style "border" "1px solid #ced4da"
            , Html.Attributes.style "padding" "0.375rem 0.75rem"
            , Html.Attributes.style "border-radius" "4px"
            , Html.Attributes.style "background-color" "white"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "line-height" "1.5"
            , Html.Attributes.style "color" "#495057"
            , Html.Attributes.style "width" "auto"
            , Html.Attributes.style "margin" "0.5rem"
            ]
    in
    div []
        [ div appStyle
            [ div sectionStyle
                [ Html.label labelStyle [ text "Symbol: " ]
                , input (inputStyle ++ [ type_ "text", onInput SelectSymbol ]) []
                , Html.label labelStyle [ text "Action: " ]
                , select (dropdownStyle ++ [ onInput SelectAction ]) (List.map optionView actionOptions)
                , button (buttonStyle ++ [ onClick <| AddSymbolAssignment model.selectedSymbol model.selectedAction ]) [ text "Assign" ]
                , div [] (List.map symbolAssignmentView model.symbolAssignments)
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Symbol: " ]
                , select (dropdownStyle ++ [ onInput SelectSymbol ]) (List.map symbolOptionView model.symbolAssignments)
                , text " -> "
                , Html.label labelStyle [ text "New Rule: " ]
                , input (inputStyle ++ [ type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ]) []
                , button (buttonStyle ++ [ onClick AddRule ]) [ text "Add Rule" ]
                , div []
                    [ text "Rules: "
                    , text <| String.join ", " <| List.map showRule model.rules
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Angle: " ]
                , div []
                    [ input (inputStyle ++ [ type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.angle) ]) []
                    , text (String.fromFloat model.angle ++ "°")
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Step Size: " ]
                , input [ type_ "range", Html.Attributes.min "1", Html.Attributes.max "10", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateStepSize), value (String.fromFloat model.stepSize) ] []
                , text (String.fromFloat model.stepSize)
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Fractional Step Size: " ]
                , input [ type_ "range", Html.Attributes.min "0.1", Html.Attributes.max "2.0", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateFractionalStepSize), value (String.fromFloat model.fractionalStepSize) ] []
                , text (String.fromFloat model.fractionalStepSize)
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Axiom: " ]
                , div []
                    [ input (inputStyle ++ [ type_ "text", onInput SelectAxiom ]) []
                    , button (buttonStyle ++ [ onClick ApplyAxiom ]) [ text "Apply Axiom" ]
                    , div []
                        [ text ("Axiom: " ++ model.axiom) ]
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Iterations: " ]
                , input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
                , text (String.fromInt model.iterations)
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Starting point: " ]
                , startingPointInput model.startingPoint
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Starting Angle: " ]
                , div []
                    [ input (inputStyle ++ [ type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle) ]) []
                    , text (String.fromFloat model.startingAngle ++ "°")
                    ]
                ]
            , div sectionStyle
                [ button (buttonStyle ++ [ onClick DrawTurtle ]) [ text "Draw" ] ]
            ]
        , div [ Html.Attributes.style "margin-left" "480px", Html.Attributes.style "margin-top" "-1400px" ]
            [ svg
                [ viewBox 0 0 1500 1385
                , TypedSvg.Attributes.width (Px 1500)
                , TypedSvg.Attributes.height (Px 1385)
                , Html.Attributes.style "margin" "1rem"
                ] <| 
                    baseRect
                        ++
                (if model.drawnTurtle then
                    Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.stepSize model.angle

                 else
                    []
                )
            ]
        ]


symbolAssignmentView : Symbol -> Html msg
symbolAssignmentView symbol =
    div []
        [ text (symbol.character ++ ": ")
        , text
            (case symbol.action of
                Move ->
                    "Move"

                MoveFraction ->
                    "MoveFraction"

                TurnLeft ->
                    "TurnLeft"

                TurnRight ->
                    "TurnRight"

                Push ->
                    "Push"

                PushAndTurnLeft ->
                    "PushAndTurnLeft"

                PushAndTurnRight ->
                    "PushAndTurnRight"

                Pop ->
                    "Pop"

                PopAndTurnLeft ->
                    "PopAndTurnLeft"

                PopAndTurnRight ->
                    "PopAndTurnRight"

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

                MoveFraction ->
                    "MoveFraction"

                TurnLeft ->
                    "TurnLeft"

                TurnRight ->
                    "TurnRight"

                Push ->
                    "Push"

                PushAndTurnLeft ->
                    "PushAndTurnLeft"

                PushAndTurnRight ->
                    "PushAndTurnRight"

                Pop ->
                    "Pop"

                PopAndTurnLeft ->
                    "PopAndTurnLeft"

                PopAndTurnRight ->
                    "PopAndTurnRight"

                NoAction ->
                    "NoAction"
    in
    option [ value actionStr ] [ text actionStr ]


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


actionOptions : List Action
actionOptions =
    [ Move, MoveFraction, TurnLeft, TurnRight, Push, PushAndTurnLeft, PushAndTurnRight, Pop, PopAndTurnLeft, PopAndTurnRight, NoAction ]


baseRect =
    [ rect
        [ x (Px 0)
        , y (Px 0)
        , width (Px 1500)
        , height (Px 1500)
        , fill (Paint Color.darkBlue)
        ]
        []
    ]
