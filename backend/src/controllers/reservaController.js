const prisma = require("../database");

async function criarReserva(request, response) {
    try {
        const { jogadorId, quadraId, data, inicio, fim } = request.body;

        if (!jogadorId || !quadraId || !data || !inicio || !fim) {
            return response.status(400).json({
                mensagem: "Todos os campos (jogadorId, quadraId, data, inicio, fim) são obrigatórios.",
            });
        }


        const dataHoraInicio = new Date(`${data}T${inicio}:00`);
        const dataHoraFim = new Date(`${data}T${fim}:00`);

        const reservaExistente = await prisma.reserva.findFirst({
            where: {
                quadraId: quadraId,
                inicio: { lt: dataHoraFim },
                fim: { gt: dataHoraInicio }
            }
        });


        if (reservaExistente) {
            return response.status(409).json({
                mensagem: "Esta quadra já está reservada para este horário."
            });
        }

        const novaReserva = await prisma.reserva.create({
            data: {
                jogadorId: jogadorId,
                quadraId: quadraId,
                inicio: dataHoraInicio,
                fim: dataHoraFim
            }
        });

        return response.status(201).json(novaReserva);



    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao criar reserva.",
        });
    }

}

async function listarReservas(request, response) {
    try {

        const reservas = await prisma.reserva.findMany({
            include: {
                jogador: true,
                quadra: true
            }
        });

        return response.status(200).json(reservas);

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao listar reservas.",
        });
    }
}

module.exports = {
    criarReserva,
    listarReservas
};