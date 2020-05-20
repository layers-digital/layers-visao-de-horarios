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
          "weekday": "wednesday",

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
          "weekday": "wednesday",

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
          "weekday": "wednesday",

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
          "weekday": "wednesday",

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
          "weekday": "wednesday",

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
          "weekday": "wednesday",

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
      // Grade horária individual
      {
        // ID interno da grade horária (opcional)
        "id": "0002",

        // Ano letivo (opcional)
        "season": "2019",

        // Nome do estudante (obrigatório)
        "student": "Ivan Seidel Gomes Nome muito grande Seidel Gomes Nome Seidel Gomes Nome ",

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
            "label": "Extracurricular",

            // Dia da semana em que o horário é vigente (obrigatório)
            // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
            "weekday": "monday",

            // Horário de início (obrigatório)
            "startTime": "15:30:00", // ISO 8601 (obrigatório)

            // Horário de fim (opcional)
            "endTime": "16:30:00", // Formato de HH:ISO 8601

            // Localização do horário (opcional)
            "location": "Campus SP, sala 12, bloco B",

            // Subtítulo do horário (opcional)
            "caption": "Prof(a): Ana Maria",
        }],
      }, {
        // ID interno da grade horária (opcional)
        "id": "0003",

        // Ano letivo (opcional)
        "season": "2020",

        // Nome do estudante (obrigatório)
        "student": "João Carlos José",

        // Nome do curso/série (opcional)
        "course": "Ensino Fundamental - 9º ano",

        // Dia em que começa a semana (opcional)
        // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
        "startWeekday": "wednesday", // default: "sunday"

        // Lista de horários
        "schedules": [{
            // Título do horário (atividade, disciplina) (obrigatório)
            "title": "Língua Portuguesa e os estudos",

            // Abreviação do titulo (opcional)
            "abbr": "PORT",

            // Etiqueta do horário (opcional)
            "label": "Extracurricular",

            // Dia da semana em que o horário é vigente (obrigatório)
            // Valores aceitos: "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
            "weekday": "wednesday",

            // Horário de início (obrigatório)
            "startTime": "15:30:00", // ISO 8601 (obrigatório)

            // Horário de fim (opcional)
            "endTime": "16:30:00", // Formato de HH:ISO 8601

            // Localização do horário (opcional)
            "location": "Campus SP, sala 12, bloco B",

            // Subtítulo do horário (opcional)
            "caption": "Prof(a): Ana Maria",
        }],
      }]
  }
]

app.get('/', function (req, res) {
  //Validate token

  //get user info

  //get layers secret
  const secret = functions.config().layers.secret

  if(!secret) {
    res.status(500).send({error: `secret not found`})
	}

  //Mount request

  //Make request
  let payload = mockedData

  res.status(200).send(payload)
})

// Expose Express API as a single Cloud Function:
exports.horarios = functions.https.onRequest(app);