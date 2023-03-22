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
            , Html.Attributes.style "background-color" "#dfe0e2"
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
            [ Html.Attributes.style "background-color" "#b7999c"
            , Html.Attributes.style "border" "none"
            , Html.Attributes.style "color" "white"
            , Html.Attributes.style "padding" "0.5rem 1rem"
            , Html.Attributes.style "margin-top" "1rem"
            , Html.Attributes.style "cursor" "pointer"
            , Html.Attributes.style "border-radius" "4px"
            ]

        buttonsStyleSyntax =
            [ Html.Attributes.style "background-color" "#eb5160"
            , Html.Attributes.style "border" "none"
            , Html.Attributes.style "color" "white"
            , Html.Attributes.style "padding" "0.5rem 1rem"
            , Html.Attributes.style "margin-top" "1rem"
            , Html.Attributes.style "cursor" "pointer"
            , Html.Attributes.style "border-radius" "4px"
            ]

        dropdownStyle =
            [ Html.Attributes.style "border" "1px solid #dfe0e2"
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
            , Html.Attributes.style "width" "10rem"
            , Html.Attributes.style "margin" "0.5rem"
            ]

        angleInputStyle =
            [ Html.Attributes.style "border" "1px solid #ced4da"
            , Html.Attributes.style "padding" "0.375rem 0.75rem"
            , Html.Attributes.style "border-radius" "4px"
            , Html.Attributes.style "background-color" "white"
            , Html.Attributes.style "font-size" "1rem"
            , Html.Attributes.style "line-height" "1.5"
            , Html.Attributes.style "color" "#495057"
            , Html.Attributes.style "width" "4rem" -- Adjust the width here as needed
            , Html.Attributes.style "margin" "0.5rem"
            ]
    in
    div [ Html.Attributes.style "background-color" "black", Html.Attributes.style "width" "100%", Html.Attributes.style "min-height" "100vh" ]
        [ div appStyle
            [ div sectionStyle
                [ div [ Html.Attributes.style "margin-left" "-40px", Html.Attributes.style "margin-top" "-50px" ]
                    [ button (buttonsStyleSyntax ++ [ onClick ToggleSyntaxDisplay ]) [ text "Syntax" ]
                    ]
                , syntaxDisplayView model
                , div [ Html.Attributes.style "margin-top" "20px", Html.Attributes.style "margin-left" "-35px" ]
                    [ select (dropdownStyle ++ [ onInput SelectSymbol ]) (List.map symbolOptionView model.symbolAssignments)
                    , input (inputStyle ++ [ type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ]) []
                    , div [ Html.Attributes.style "margin-left" "280px", Html.Attributes.style "margin-top" "-60px" ]
                        [ button (buttonStyle ++ [ onClick AddRule ]) [ text "Add Rule" ]
                        ]
                    ]
                , div [ Html.Attributes.style "margin-top" "10px" ]
                    [ text "Rules: "
                    , text <| String.join ", " <| List.map showRule model.rules
                    ]
                ]
            , div sectionStyle
                [ div [ Html.Attributes.style "margin-left" "45px" ]
                    [ input (inputStyle ++ [ type_ "text", onInput SelectAxiom ]) []
                    , button (buttonStyle ++ [ onClick ApplyAxiom ]) [ text "Apply Axiom" ]
                    , div [ Html.Attributes.style "margin-left" "-45px" ]
                        [ text ("Axiom: " ++ model.axiom) ]
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Turning angle " ]
                , div [ Html.Attributes.style "margin-left" "150px", Html.Attributes.style "margin-top" "-40px" ]
                    [ input (angleInputStyle ++ [ type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.angle) ]) []
                    , text (String.fromFloat model.angle ++ "°")
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Line length " ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ type_ "range", Html.Attributes.min "1", Html.Attributes.max "10", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLength), value (String.fromFloat model.lineLength) ] []
                    , text (String.fromFloat model.lineLength)
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Line width increment" ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3.0", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineWidthIncrement), value (String.fromFloat model.lineWidthIncrement) ] []
                    , text (String.fromFloat model.lineWidthIncrement)
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Iterations " ]
                , div [ Html.Attributes.style "margin-left" "200px", Html.Attributes.style "margin-top" "-25px" ]
                    [ input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
                    , text (String.fromInt model.iterations)
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Starting Angle " ]
                , div [ Html.Attributes.style "margin-left" "150px", Html.Attributes.style "margin-top" "-40px" ]
                    [ input (angleInputStyle ++ [ type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle) ]) []
                    , text (String.fromFloat model.startingAngle ++ "°")
                    ]
                ]
            , div sectionStyle
                [ Html.label labelStyle [ text "Starting point " ]
                , startingPointInput model.startingPoint
                ]
            , div sectionStyle
                [ button (buttonStyle ++ [ onClick DrawTurtle ]) [ text "Draw" ] ]
            ]
        , div [ Html.Attributes.style "margin-left" "484px", Html.Attributes.style "margin-top" "-985px" ]
            [ svg
                [ viewBox 0 0 1500 970
                , TypedSvg.Attributes.width (Px 1500)
                , TypedSvg.Attributes.height (Px 970)
                , Html.Attributes.style "margin" "1rem"
                ]
              <|
                baseRect
                    ++ (if model.drawnTurtle then
                            (Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.angle)
                            ++ (Turtle.renderTurtleDots <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.angle)

                        else
                            []
                       )
            ]
        ]


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


baseRect =
    [ rect
        [ x (Px 0)
        , y (Px 0)
        , width (Px 1500)
        , height (Px 970)
        , fill (Paint Color.black)
        , stroke (Paint (Color.rgb255 235 81 96))
        , strokeWidth (Px 6)
        ]
        []
    ]


syntaxDisplayView : Model -> Html Msg
syntaxDisplayView model =
    if model.syntaxDisplay then
        div []
            [ h2 [] [ text "Syntax" ]
            , Html.ul []
                [ Html.li [] [ text "F -> Move forward by line length drawing a line" ]
                , Html.li [] [ text "G -> Move forward by line length without drawing a line" ]
                , Html.li []
                    [ text "+ -> Turn left by turning angle"
                    , Html.li [] [ text "- -> Turn right by turning angle" ]
                    , Html.li [] [ text "| -> Reverse direction (ie: turn by 180 degrees)" ]
                    , Html.li [] [ text "[ -> Push current drawing state onto stack" ]
                    , Html.li [] [ text "] -> Pop current drawing state from the stack" ]
                    , Html.li [] [ text "# -> Increment the line width by line width increment" ]
                    , Html.li [] [ text "! -> Decrement the line width by line width increment" ]
                    , Html.li [] [ text "@ -> Draw a dot with line width radius" ]
                    , Html.li [] [ text "X -> No action" ]
                    ]

                -- Add more li elements for each symbol and action as needed
                ]
            ]

    else
        text ""
