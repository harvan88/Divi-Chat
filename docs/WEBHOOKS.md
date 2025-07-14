# 🌐 Webhooks de Entrada

Este archivo resume los endpoints disponibles para recibir eventos externos y el formato esperado.

---

## Verificación

`GET /webhook`

Meta (WhatsApp) realiza una solicitud de verificación enviando los parámetros `hub.mode`, `hub.verify_token` y `hub.challenge`. Si el token coincide con `Bun.env.VERIFY_TOKEN`, se devuelve el `challenge` como texto plano.

## Mensajes entrantes

`POST /webhook`

El cuerpo sigue la estructura definida en `src/domain/types/whatsapp.webhook-payload.ts`. Un ejemplo abreviado es:

```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "AB123",
    "changes": [{
      "field": "messages",
      "value": {
        "messages": [{
          "from": "51999999999",
          "text": { "body": "Hola" }
        }]
      }
    }]
  }]
}
```

De este objeto se extraen los campos `from` y `text.body` para procesarlos en el sistema.