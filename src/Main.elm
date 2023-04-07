port module Main exposing (main, updateCanvasSize, subscriptions)

import Browser
import Model exposing (init, Model)
import Update exposing (update, Msg(..))
import View exposing (view)
import Json.Decode as Decode exposing (Value)

port updateCanvasSize : (Value -> msg) -> Sub msg




main : Program () Model.Model Update.Msg
main =
    Browser.element
        { init = \_ ->  (init, Cmd.none)
        , update = update
        , view = view
        , subscriptions = subscriptions
        } 

canvasSizeDecoder : Decode.Decoder (Float, Float)
canvasSizeDecoder =
    Decode.map2 Tuple.pair
        (Decode.field "width" Decode.float)
        (Decode.field "height" Decode.float)

subscriptions : Model -> Sub Msg
subscriptions _ =
    updateCanvasSize
        (\value ->
            case Decode.decodeValue canvasSizeDecoder value of
                Ok (width, height) ->
                    UpdateCanvasSize width height

                Err _ ->
                    -- Handle the case where the value cannot be decoded
                    -- (e.g., you could log an error or ignore it)
                    NoOp
        )