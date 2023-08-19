import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const conversationId = event.Details.ContactData.ContactId; // Adjust this based on your input data format

  // 1. Retrieve required attributes
  const getParams = {
    TableName: "callRecords",
    Key: {
      callId: conversationId,
      CALL_METADATA: "CALL_METADATA"
    }
  };

  try {
    const response = await ddbDocClient.send(new GetCommand(getParams));
    let durationInSeconds = 0
    const currentTime = new Date();
    // yes flow
    if (response.calificacion && response.autorizacion) {
      const timeStarted = new Date(response.Item.timeStarted);
      const saludoDuration = parseFloat(response.Item.saludo.duracion);
      const autorizacionDuration = parseFloat(response.Item.autorizacion.duracion);
      const calificacionDuration = parseFloat(response.Item.calificacion.duracion);
      // 2. Calculate the new duration for despedida
      durationInSeconds = (currentTime - timeStarted) / 1000 - saludoDuration - autorizacionDuration - calificacionDuration;
    } else if (response.autorizacion) {
      // no flow
      const timeStarted = new Date(response.Item.timeStarted);
      const saludoDuration = parseFloat(response.Item.saludo.duracion);
      const autorizacionDuration = parseFloat(response.Item.autorizacion.duracion);
      durationInSeconds = (currentTime - timeStarted) / 1000 - saludoDuration - autorizacionDuration;
    } else {
      // error TODO
      const timeStarted = new Date(response.Item.timeStarted);
      const saludoDuration = parseFloat(response.Item.saludo.duracion);
      durationInSeconds = (currentTime - timeStarted) / 1000 - saludoDuration;
    }

    // 3. Update the despedida attribute and timeFinished
    const updateParams = {
      TableName: "callRecords",
      Key: {
        callId: conversationId,
        CALL_METADATA: "CALL_METADATA"
      },
      UpdateExpression: "SET despedida = :despedidaValue",
      ExpressionAttributeValues: {
        ":despedidaValue": {
          duracion: durationInSeconds.toString(),
          nivelConfianza: null,
          inputMethod: null,
          inputResult: null
        },
      }
    };

    await ddbDocClient.send(new UpdateCommand(updateParams));
    return { statusCode: 200, body: 'Call updated successfully after despedida' };
  } catch (error) {
    console.error("Error updating call after despedida:", error);
    return { statusCode: 500, body: 'Error updating call after despedida' };
  }
};
