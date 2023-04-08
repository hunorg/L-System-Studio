module View exposing (..)

import Color
import ColorPicker
import Html exposing (Html, button, div, h2, h3, img, input, li, option, p, section, select, span, text, ul)
import Html.Attributes exposing (classList, placeholder, src, step, type_, value)
import Html.Events exposing (onClick, onInput)
import Html.Events.Extra.Mouse as Mouse
import LSys exposing (generateTurtle)
import Model exposing (Model, Symbol)
import Turtle exposing (Action(..))
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Types exposing (Length(..), Paint(..))
import Update exposing (..)


showRule : ( Char, List Char.Char ) -> String
showRule ( from, to ) =
    String.fromChar from ++ " → " ++ String.fromList to


view : Model -> Html Msg
view model =
    div [ class [ "flexContainer" ] ]
        [ button [ class [ "toggleSidebar" ], onClick ToggleSidebar ] [ text "≡" ]
        , if model.showSidebar then
            div [ class [ "sidebar" ] ]
                [ div [ class [ "sidebarContent" ] ]
                    [ section [ class [ "infoSection" ] ]
                        [ h2 [] [ text "Info" ]
                        , p []
                            [ Html.a [ href "http://paulbourke.net/fractals/lsys/" ] [ text "For more information and examples, please visit Paul Bourke's L-System page" ] ]
                        , img [ src "https://i.ibb.co/F44fjhV/open-book.png", onClick ToggleSyntaxDisplay, Html.Attributes.style "width" "3.5rem", Html.Attributes.style "cursor" "pointer" ] []
                        , img [ src "https://i.ibb.co/qWqnNVZ/reset.png", onClick Reset, Html.Attributes.style "width" "3.5rem", Html.Attributes.style "cursor" "pointer", Html.Attributes.style "margin-left" "1rem" ] []
                        , syntaxDisplayView model
                        ]
                    , section []
                        [ h2 [] [ text "Rules and Axiom" ]
                        , div [ class [ "grid" ] ]
                            [ div [] [ h3 [] [ text "Rules:" ] ]
                            , div [ class [ "rulesContainer" ] ]
                                [ div []
                                    [ ul [class ["rulesAndAxiomText"], Html.Attributes.style "cursor" "pointer"]
                                        (List.map
                                            (\rule -> ruleView rule model)
                                            model.rules
                                        )
                                    , case model.selectedRule of
                                        ( Just _, True ) ->
                                            img [ class [ "buttonRemoveRule" ], src "https://i.ibb.co/KqQjhGF/delete.png", onClick RemoveSelectedRule ] []

                                        _ ->
                                            text ""
                                    ]
                                ]
                            , select [ class [ "dropdown" ], onInput SelectSymbol ] (List.map symbolOptionView model.symbolAssignments)
                            , input [ class [ "input" ], type_ "text", value model.newRuleInput, onInput UpdateNewRuleInput ] []
                            , div [] []
                            , button [ class [ "button" ], onClick AddRule ] [ text "Add Rule" ]
                            , div [] [ h3 [] [ text "Axiom:" ] ]
                            , div [ class [ "rulesAndAxiomText" ] ]
                                [ text
                                    (if model.axiomApplied then
                                        model.axiom

                                     else
                                        ""
                                    )
                                ]
                            , div [] []
                            , input [ class [ "input" ], type_ "text", onInput SelectAxiom ] []
                            , div [] []
                            , button [ class [ "button" ], onClick ApplyAxiom ] [ text "Apply Axiom" ]
                            ]
                        ]
                    , section []
                        [ h2 [] [ text "Turtle Settings" ]
                        , div [ class [ "grid2" ] ]
                            [ Html.label [ class [ "label" ] ] [ text "Turning angle " ]
                            , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.turningAngle) ] []
                            , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngle ++ "°") ]
                            , Html.label [ class [ "label" ] ] [ text "Turning angle increment " ]
                            , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateTurningAngleIncrement), value (String.fromFloat model.turningAngleIncrement) ] []
                            , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.turningAngleIncrement ++ "°") ]
                            , Html.label [ class [ "label" ] ] [ text "Line length " ]
                            , input [ class [ "slider" ], type_ "range", Html.Attributes.min "1", Html.Attributes.max "25", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLength), value (String.fromFloat model.lineLength) ] []
                            , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLength) ]
                            , Html.label [ class [ "label" ] ] [ text "Line length scale" ]
                            , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineLengthScale), value (String.fromFloat model.lineLengthScale) ] []
                            , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineLengthScale) ]
                            , Html.label [ class [ "label" ] ] [ text "Line width increment" ]
                            , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0.0", Html.Attributes.max "3.0", step "0.1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateLineWidthIncrement), value (String.fromFloat model.lineWidthIncrement) ] []
                            , span [ class [ "sliderValueText" ] ] [ text (String.fromFloat model.lineWidthIncrement) ]
                            , Html.label [ class [ "label" ] ] [ text "Recursion depth " ]
                            , input [ class [ "slider" ], type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
                            , span [ class [ "sliderValueText" ] ] [ text (String.fromInt model.iterations) ]
                            , Html.label [ class [ "label" ] ] [ text "Starting Angle " ]
                            , input [ class [ "inputAngle" ], type_ "number", Html.Attributes.min "-360", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateStartingAngle), value (String.fromFloat model.startingAngle) ] []
                            , span [ class [ "angleValueText" ] ] [ text (String.fromFloat model.startingAngle ++ "°") ]
                            , Html.label [ class [ "label" ] ] [ text "Starting point " ]
                            , span [ class [ "startingPointValueText" ] ] [ text ((model.startingPoint |> Tuple.first |> String.fromFloat) ++ ", " ++ (model.startingPoint |> Tuple.second |> String.fromFloat)) ]
                            ]
                        ]
                    , section [ class [ "drawSection" ] ]
                        [ button [ class [ "buttonDraw" ], onClick DrawTurtle ] [ text "Draw" ]
                        ]
                    , section [ class [ "attributionSection" ] ]
                        [ h2 [] [ text "Attribution" ]
                        , Html.a [ href "https://github.com/hunorg" ] [ text "created by @hunorg" ]
                        , div []
                            [ Html.a [ href "https://github.com/hunorg/L-System-Studio" ] [ text "source code" ] ]
                        ]
                    ]
                ]

          else
            text ""
        , div
            [ class [ "canvas" ]
            , if model.showSidebar then
                Html.Attributes.style "padding-left" "0rem"

              else
                Html.Attributes.style "padding-left" "1rem"
            ]
            [ div [ class [ "canvasContent" ] ]
                [ svg
                    [ viewBox 0 0 model.canvasWidth model.canvasHeight
                    , Mouse.onDown (\event -> DownMsg event.button event.offsetPos)
                    ]
                  <|
                    let
                        generatedTurtle =
                            generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle
                    in
                    if model.drawnTurtle then
                        (Turtle.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                            ++ (Turtle.renderTurtleDots <| generateTurtle model model.generatedSequence model.symbolAssignments model.lineLength model.turningAngle)
                            ++ [ Turtle.drawFilledPolygons generatedTurtle.filledPolygons ]
                        -- Add filled polygons

                    else
                        []
                ]
            ]
        ]


ruleView : ( Char, List Char ) -> Model -> Html Msg
ruleView rule model =
    let
        isSelected =
            case model.selectedRule of
                ( Just selectedRule, True ) ->
                    rule == selectedRule

                _ ->
                    False
    in
    li [ onClick (SelectRule rule), classList [ ( "selectedRule", isSelected ) ] ]
        [ text <| String.fromChar (Tuple.first rule) ++ " -> " ++ String.fromList (Tuple.second rule) ]



{- polyigon fill colour label + widget

   , div [ Html.Attributes.style "margin-top" "40px" ]
                       [ Html.label [ class [ "labelPolygonFillColour" ] ] [ text "Polygon fill colour" ]
                       , colorPickerView model.polygonFillColor model.colorPicker
                       ]

-}


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


colorPickerView : Color.Color -> ColorPicker.State -> Html Msg
colorPickerView color state =
    ColorPicker.view color state
        |> Html.map ColorPickerMsg


syntaxDisplayView : Model -> Html Msg
syntaxDisplayView model =
    if model.syntaxDisplay then
        div []
            [ h3 [] [ text "Syntax" ]
            , Html.ul [ class [ "syntaxText" ] ]
                (List.map
                    (\item ->
                        let
                            ( boldText, restText ) =
                                case String.split "->" item of
                                    b :: r :: [] ->
                                        ( String.trim b, String.trim r )

                                    _ ->
                                        ( "", "" )
                        in
                        Html.li []
                            [ Html.b [] [ text boldText ]
                            , text " -> "
                            , text restText
                            ]
                    )
                    [ "F -> Move forward by line length drawing a line"
                    , "G -> Move forward by line length drawing a line"
                    , "f -> Move forward by line length without drawing a line"
                    , "+ -> Turn left by turning angle"
                    , "- -> Turn right by turning angle"
                    , "| -> Reverse direction (ie: turn by 180 degrees)"
                    , "[ -> Push current drawing state onto stack"
                    , "] -> Pop current drawing state from the stack"
                    , "# -> Increment the line width by line width increment"
                    , "! -> Decrement the line width by line width increment"
                    , "@ -> Draw a dot with line width radius"
                    , "{ -> Open a polygon"
                    , "} -> Close a polygon and fill it with fill colour"
                    , "< -> Multiply the line length by the line length scale"
                    , "> -> Divide the line length by the line length scale"
                    , "& -> Swap the meaning of + and -"
                    , "( -> Decrement turning angle by turning angle increment"
                    , ") -> Increment turning angle by turning angle increment"
                    , "a to z (except f) -> No action"
                    ]
                )
            ]

    else
        text ""
