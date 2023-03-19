module Lsystem exposing (..)

import Browser
import Char
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import LSystem exposing (..)
import TurtleG exposing (..)
import TypedSvg exposing (..)
import TypedSvg.Attributes exposing (..)
import TypedSvg.Core exposing (Svg)
import TypedSvg.Types exposing (Length(..))



-- MODEL


type alias Model =
    { symbolAssignments : List Symbol
    , rules : List ( Char, List Char )
    , selectedSymbol : String
    , selectedAction : Action
    , newRuleInput : String
    , angle : Float
    , stepSize : Float
    , axiom : String
    , iterations : Int
    , startingPoint : ( Float, Float )
    , generatedSequence : List Char
    , drawnTurtle : Bool
    }


type alias Symbol =
    { character : String
    , action : Action
    }


type Action
    = Move
    | TurnLeft
    | TurnRight
    | Push
    | Pop


init : Model
init =
    { symbolAssignments = []
    , rules = []
    , selectedSymbol = ""
    , selectedAction = Move
    , newRuleInput = ""
    , angle = 0
    , stepSize = 1
    , axiom = ""
    , iterations = 0
    , startingPoint = ( 0, 0 )
    , generatedSequence = []
    , drawnTurtle = False
    }



-- UPDATE


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
    | AddRule
    | AssignSymbol
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
            { model | axiom = String.uncons newAxiom |> Maybe.map Tuple.first |> Maybe.withDefault ' ' |> String.fromChar }

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

        AddRule ->
            let
                newRule =
                    ( String.uncons model.selectedSymbol |> Maybe.map Tuple.first |> Maybe.withDefault ' ', String.toList model.newRuleInput )

                newModel =
                    { model | rules = model.rules ++ [ newRule ], newRuleInput = "" }
            in
            { newModel | generatedSequence = generateSequence newModel.iterations newModel.axiom newModel.rules }

        DrawTurtle ->
            { model | generatedSequence = generateSequence model.iterations model.axiom model.rules, drawnTurtle = True }



-- VIEW


startingPointInput : ( Float, Float ) -> Html Msg
startingPointInput ( x, y ) =
    Html.div []
        [ Html.input [ placeholder "X", value (String.fromFloat x), onInput UpdateStartingPointX ] []
        , Html.input [ placeholder "Y", value (String.fromFloat y), onInput UpdateStartingPointY ] []
        ]

showRule : (Char, List Char.Char) -> String
showRule (from, to) =
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
        , div [ ]
            [ text "Rules: "
            , text <| String.join ", " <| List.map showRule model.rules
            ]
        , h2 [] [ text "Angle" ]
        , input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "360", step "1", onInput (String.toFloat >> Maybe.withDefault 0 >> UpdateAngle), value (String.fromFloat model.angle) ] []
        , text (String.fromFloat model.angle ++ "°")
        , h2 [] [ text "Step Size" ]
        , input [ type_ "range", Html.Attributes.min "1", Html.Attributes.max "10", step "1", onInput (String.toFloat >> Maybe.withDefault 1 >> UpdateStepSize), value (String.fromFloat model.stepSize) ] []
        , text (String.fromFloat model.stepSize)
        , h2 [] [ text "Axiom" ]
        , select [ onInput SelectAxiom ] (List.map symbolOptionView model.symbolAssignments)
        , text ("Axiom: " ++ model.axiom)
        , h2 [] [ text "Iterations" ]
        , input [ type_ "range", Html.Attributes.min "0", Html.Attributes.max "20", value (String.fromInt model.iterations), onInput (String.toInt >> Maybe.withDefault 0 >> UpdateIterations) ] []
        , text (String.fromInt model.iterations)
        , h2 [] [ text "Starting Point" ]
        , startingPointInput model.startingPoint
        , button [ onClick DrawTurtle ] [ text "Draw" ]
        ,svg [ viewBox 0 0 1000 1000, TypedSvg.Attributes.width (Px 1000), TypedSvg.Attributes.height (Px 1000) ] 
            (if model.drawnTurtle then
                TurtleG.renderTurtleSegments <| generateTurtle model model.generatedSequence model.symbolAssignments model.stepSize model.angle
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
    in
    option [ value actionStr ] [ text actionStr ]


symbolOptionView : Symbol -> Html msg
symbolOptionView symbol =
    option [ value symbol.character ] [ text symbol.character ]


actionOptions : List Action
actionOptions =
    [ Move, TurnLeft, TurnRight, Push, Pop ]


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

        _ ->
            Move



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }



--generate


generateSequence : Int -> String -> List ( Char, List Char ) -> List Char
generateSequence iterations axiom rules =
    let
        expandSymbol symbol =
            case List.filter (\( s, _ ) -> s == symbol) rules of
                [] ->
                    [ symbol ]

                ( _, replacement ) :: _ ->
                    replacement
    in
    List.foldl (\_ seq -> List.concatMap expandSymbol seq) (String.toList axiom) (List.range 1 iterations)


generateTurtle : Model -> List Char -> List Symbol -> Float -> Float -> Turtle
generateTurtle model sequence symbolAssignments stepSize angle =
    let
        applyAction turtle action =
            case action of
                Move ->
                    moveForward stepSize turtle

                TurnLeft ->
                    turn -angle turtle

                TurnRight ->
                    turn angle turtle

                Push ->
                    push turtle

                Pop ->
                    pop turtle

        applySymbol symbol turtle =
            case List.filter (\s -> s.character == String.fromChar symbol) symbolAssignments of
                [] ->
                    turtle

                symbolAssignment :: _ ->
                    applyAction turtle symbolAssignment.action
    in
    List.foldl applySymbol (TurtleG.initTurtle model.startingPoint) sequence
