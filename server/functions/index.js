const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

let mockedData = [
    {
      "provider": {
        "name": "Totvs",
        "icon": "https://cdn.layers.digital/demo-escola/uploads/7d481323-4f95-417e-bc62-6eb4e58a066a/image8.png",
      },
      "result":  [

      {
        // ID interno da grade horária (opcional)
        "id": "0002",

        // Ano letivo (opcional)
        "season": "2019",

        // Nome do estudante (obrigatório)
        "student": "ELISA POSSAMAI BORGES DA CUNHA",

        // Nome do curso/série (opcional)
        "course": "9º Ano",

        // Dia em que começa a semana (opcional)
        // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
        "startWeekday": "monday", // default: "sunday"

        // Lista de horários
        "schedules": [
            {
              "title": "ARTE",
              "abbr": "ART",
              "weekday": "friday",
              "startTime": "07:00:00",
              "endTime": "07:50:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Ana Maria",
            },
            {
              "title": "CIÊNCIAS",
              "abbr": "CIE",
              "weekday": "friday",
              "startTime": "07:50:00",
              "endTime": "08:40:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Joana",
            },
            {
              "title": "EDUCAÇÃO FÍSICA",
              "abbr": "EDF",
              "weekday": "friday",
              "startTime": "08:40:00",
              "endTime": "09:30:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Fernando",
            },
            {
              "title": "ROBÓTICA",
              "abbr": "ROB",
              "weekday": "friday",
              "label": "Extracurricular",
              "startTime": "18:00:00",
              "endTime": "19:00:00",
              "location": "Sala Criatividade",
              "caption": "Prof(a): Marcelo",
            },
            {
              "title": "ENSINO RELIGIOSO",
              "abbr": "ENR",
              "weekday": "friday",
              "startTime": "17:00:00",
              "endTime": "18:00:00",
              "location": "Igreja",
              "caption": "Prof(a): Padre Alonso",
            },
            {
              "title": "GEOGRAFIA",
              "abbr": "GEO",
              "weekday": "friday",
              "startTime": "09:50:00",
              "endTime": "10:40:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Cláudio",
            },
            {
              "title": "HISTÓRIA",
              "abbr": "HIS",
              "weekday": "friday",
              "startTime": "10:40:00",
              "endTime": "11:30:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Leila",
            },
            {
              "title": "L.E.M. - INGLÊS",
              "abbr": "ING",
              "weekday": "friday",
              "startTime": "11:30:00",
              "endTime": "12:20:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Marcos",
            },
            {
              "title": "LÍNGUA PORTUGUESA",
              "abbr": "LPO",
              "weekday": "thursday",
              "startTime": "07:00:00",
              "endTime": "07:50:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Carlos",
            },
            {
              "title": "MATEMÁTICA",
              "abbr": "MAT",
              "weekday": "thursday",
              "startTime": "07:50:00",
              "endTime": "08:40:00",
              "location": "Campus SP, sala 12, bloco B",
              "caption": "Prof(a): Fabio",
            }
          ],
      },


      // Grade horária individual
      {
        // ID interno da grade horária (opcional)
        "id": "0001",

        // Ano letivo (opcional)
        "season": "2019",

        // Nome do estudante (obrigatório)
        "student": "Ivan Seidel Gomes",

        // Nome do curso/série (opcional)
        "course": "9º Ano",

        // Dia em que começa a semana (opcional)
        // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
        "startWeekday": "monday", // default: "sunday"

        // Lista de horários
        "schedules": [{
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Língua Portuguesa e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "PORT",

          // Etiqueta do horário (opcional)
          "label": "Grad",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "tuesday",

          // Horário de início (obrigatório)
          "startTime": "21:00:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Língua Portuguesa e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "PORT",

          // Etiqueta do horário (opcional)
          "label": "Grad",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "tuesday",

          // Horário de início (obrigatório)
          "startTime": "21:00:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Língua Portuguesa e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "PORT",

          // Etiqueta do horário (opcional)
          "label": "Grad",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "21:00:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Língua Portuguesa e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "PORT",

          // Etiqueta do horário (opcional)
          "label": "Grad",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "21:00:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Língua Portuguesa e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "PORT",

          // Etiqueta do horário (opcional)
          "label": "Grad",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "21:00:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        },{
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Física e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "FIS",

          // Etiqueta do horário (opcional)
          "label": "Extracurricular",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "03:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Matemática e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "MAT",

          // Etiqueta do horário (opcional)
          "label": "Extracurricular",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "03:01", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Geografia e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "GEO",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": Date.now(), // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "História e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "HIS",

          // Etiqueta do horário (opcional)
          "label": "Extracurricular",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": new Date(), // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Biologia e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "BIO",

          // Etiqueta do horário (opcional)
          "label": "Extracurricular",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "thursday",

          // Horário de início (obrigatório)
          "startTime": "23:00", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }, {
          // Título do horário (atividade, disciplina) (obrigatório)
          "title": "Filosofia e os estudos",

          // Abreviação do titulo (opcional)
          "abbr": "FIL",

          // Etiqueta do horário (opcional)
          "label": "Extracurricular",

          // Dia da semana em que o horário é vigente (obrigatório)
          // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
          "weekday": "friday",

          // Horário de início (obrigatório)
          "startTime": "15:0022", // ISO 8601 (obrigatório)

          // Horário de fim (opcional)
          "endTime": "16:30:00", // Formato de HH:ISO 8601

          // Localização do horário (opcional)
          "location": "Campus SP, sala 12, bloco B",

          // Subtítulo do horário (opcional)
          "caption": "Prof(a): Ana Maria",
        }],
      },
    ]
  }
]

app.get('/', function (req, res) {
  //Validate token

  //get user info

  //get layers secret
 //  const secret = functions.config().layers.secret

 //  if(!secret) {
 //    res.status(500).send({error: `secret not found`})
	// }

  //Mount request

  //Make request
  let payload = mockedData

  res.status(200).send(payload)
})

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);