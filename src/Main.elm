port module Main exposing (main, subscriptions)

import Browser
import Browser.Events exposing (onResize)
import Json.Decode as Decode exposing (Value)
import Model exposing (Flags, Model, init)
import Time
import Update exposing (Msg(..), update)
import View exposing (view)


port updateCanvasSize : (Value -> msg) -> Sub msg


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


canvasSizeDecoder : Decode.Decoder ( Float, Float )
canvasSizeDecoder =
    Decode.map2 Tuple.pair
        (Decode.field "width" Decode.float)
        (Decode.field "height" Decode.float)


tick : Sub Msg
tick =
    Time.every 10 Animate


subscriptions : Model -> Sub Msg
subscriptions model =
    let
        animationFrameSub =
            case model.lastAnimationFrameTimestamp of
                Nothing ->
                    Sub.none

                Just _ ->
                    Browser.Events.onAnimationFrame AnimationFrame
    in
    Sub.batch
        [ updateCanvasSize
            (\value ->
                case Decode.decodeValue canvasSizeDecoder value of
                    Ok ( width, height ) ->
                        UpdateCanvasSize width height

                    Err _ ->
                        NoOp
            )
        , tick
        , animationFrameSub
        , onResize (\width height -> Resize ( width, height ))
        ]
