port module Main exposing (main, subscriptions)

import Browser
import Browser.Events
import Json.Decode as Decode exposing (Value)
import Model exposing (Model, init)
import Update exposing (Msg(..), update)
import View exposing (view)


port updateCanvasSize : (Value -> msg) -> Sub msg


main : Program () Model.Model Update.Msg
main =
    Browser.element
        { init = \_ -> ( init, Cmd.none )
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


canvasSizeDecoder : Decode.Decoder ( Float, Float )
canvasSizeDecoder =
    Decode.map2 Tuple.pair
        (Decode.field "width" Decode.float)
        (Decode.field "height" Decode.float)


subscriptions : Model -> Sub Msg
subscriptions _ =
    updateCanvasSize
        (\value ->
            case Decode.decodeValue canvasSizeDecoder value of
                Ok ( width, height ) ->
                    UpdateCanvasSize width height

                Err _ ->
                    -- Handle the case where the value cannot be decoded
                    -- (e.g., you could log an error or ignore it)
                    NoOp
        )
