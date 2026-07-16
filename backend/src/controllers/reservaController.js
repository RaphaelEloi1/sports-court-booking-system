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
async function atualizarReserva(request, response) {
    try {
        const id = parseInt(request.params.id);
        const { jogadorId, quadraId, data, inicio, fim } = request.body;


        if (isNaN(id)) {
            return response.status(400).json({ mensagem: "ID inválido." });
        }


        const reservaExistente = await prisma.reserva.findUnique({ where: { id: id } });
        if (!reservaExistente) {
            return response.status(404).json({ mensagem: "Reserva não encontrada." });
        }

        const dataHoraInicio = new Date(`${data}T${inicio}:00`);
        const dataHoraFim = new Date(`${data}T${fim}:00`);


        if (dataHoraFim <= dataHoraInicio) {
            return response.status(400).json({
                mensagem: "O horário de fim deve ser depois do horário de início."
            });
        }


        const conflitoReserva = await prisma.reserva.findFirst({
            where: {
                id: { not: id },
                quadraId: quadraId,
                inicio: { lt: dataHoraFim },
                fim: { gt: dataHoraInicio }
            }
        });

        if (conflitoReserva) {
            return response.status(409).json({
                mensagem: "Esta quadra já está reservada para este horário."
            });
        }


        const reservaAtualizada = await prisma.reserva.update({
            where: { id: id },
            data: {
                jogadorId: jogadorId,
                quadraId: quadraId,
                inicio: dataHoraInicio,
                fim: dataHoraFim
            }
        });

        return response.status(200).json(reservaAtualizada);

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao atualizar reserva.",
        });
    }
}

async function deletarReserva(request, response) {
    try {
        const id = parseInt(request.params.id);

        if (isNaN(id)) {
            return response.status(400).json({ mensagem: "ID inválido." });
        }

        const reserva = await prisma.reserva.findUnique({ where: { id: id } });

        if (!reserva) {
            return response.status(404).json({ mensagem: "Reserva não encontrada." });
        }

        await prisma.reserva.delete({
            where: { id: id }
        });

        return response.status(200).json({ mensagem: "Reserva cancelada com sucesso." });

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            mensagem: "Erro ao deletar reserva.",
        });
    }
}


module.exports = {
    criarReserva,
    listarReservas,
    atualizarReserva,
    deletarReserva,
};