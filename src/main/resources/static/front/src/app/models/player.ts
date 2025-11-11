export class Player {

    id!: number;
    nome!: string;
    partidas!: number;
    pontuacao!: number;

    constructor(id: number, nome: string, partidas: number, pontuacao: number){
        this.id = id;
        this.nome = nome;
        this.partidas = partidas;
        this.pontuacao = pontuacao;
    }

}
