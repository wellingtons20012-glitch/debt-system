const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Juazeiro:Juazeiro123@cluster0.iscg9rs.mongodb.net/?retryWrites=true&w=majority";
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const client = new MongoClient(uri);
    await client.connect();
    cachedDb = client.db('sistema_cobranca');
    return cachedDb;
}

exports.handler = async (event, context) => {
    if (event.path.endsWith('/salvar-dados-nuvem') && event.httpMethod === 'POST') {
        try {
            const db = await connectToDatabase();
            const collection = db.collection('dados_sistema');
            
            const dadosRecebidos = JSON.parse(event.body);

            await collection.updateOne(
                { id_unico: "principal" },
                { $set: { dados: dadosRecebidos, atualizadoEm: new Date() } },
                { upsert: true }
            );

            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: true, message: "Dados salvos com sucesso no MongoDB via Netlify!" })
            };
        } catch (error) {
            console.error("Erro ao salvar no MongoDB:", error);
            return {
                statusCode: 500,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: false, error: error.message })
            };
        }
    }

    return {
        statusCode: 404,
        body: "Rota não encontrada"
    };
};
