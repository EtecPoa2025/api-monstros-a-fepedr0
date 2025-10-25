const API_URL = 'http://localhost:3000/monstros';

const listaMonstros = document.getElementById('listaMonstros');
const btnLista = document.getElementById('lista');
const btnAleatorio = document.getElementById('aleatorio');
const filtroById = document.getElementById('filtro_by_id');
const filtroTipo = document.getElementById('filtro_tipo');
const filtroVidaMin = document.getElementById('filtro_vida_min');
const filtroVidaMax = document.getElementById('filtro_vida_max');
const filtroTexto = document.getElementById('filtro_texto');
const btnFiltrar = document.getElementById('btn_filtrar');

async function carregarMonstros() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro');
        return await response.json();
    } catch (error) {
        alert('Erro ao carregar monstros.');
        return [];
    }
}

function exibirMonstros(monstros) {
    listaMonstros.innerHTML = '';
    if (monstros.length === 0) {
        listaMonstros.innerHTML = '<li>Nenhum monstro encontrado.</li>';
        return;
    }
    monstros.forEach(monstro => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${monstro.nome}</h3>
            <img src="${monstro.imagem}" alt="${monstro.nome}" style="max-width: 200px;">
            <p>${monstro.descricao}</p>
            <p><strong>Tipo:</strong> ${monstro.tipo_criatura}</p>
            <p><strong>Vida:</strong> ${monstro.pontos_vida}</p>
            <p><strong>Ataque:</strong> ${monstro.ataque}</p>
            <p><strong>Defesa:</strong> ${monstro.defesa}</p>
            <p><strong>Habitat:</strong> ${monstro.habitat}</p>
        `;
        listaMonstros.appendChild(li);
    });
}

function filtrarMonstros(monstros) {
    let filtrados = monstros;
    const id = filtroById.value.trim();
    if (id) {
        return monstros.filter(m => m.id == id);
    }
    const tipo = filtroTipo.value;
    if (tipo) {
        filtrados = filtrados.filter(m => m.tipo_criatura === tipo);
    }
    const vidaMin = parseInt(filtroVidaMin.value) || 0;
    if (vidaMin > 0) {
        filtrados = filtrados.filter(m => m.pontos_vida >= vidaMin);
    }
    const vidaMax = parseInt(filtroVidaMax.value) || Infinity;
    if (vidaMax < Infinity) {
        filtrados = filtrados.filter(m => m.pontos_vida <= vidaMax);
    }
    const texto = filtroTexto.value.toLowerCase().trim();
    if (texto) {
        filtrados = filtrados.filter(m => 
            m.nome.toLowerCase().includes(texto) || 
            m.descricao.toLowerCase().includes(texto)
        );
    }
    return filtrados;
}

btnLista.addEventListener('click', async () => {
    const monstros = await carregarMonstros();
    exibirMonstros(monstros);
});

btnAleatorio.addEventListener('click', async () => {
    const monstros = await carregarMonstros();
    if (monstros.length > 0) {
        const aleatorio = monstros[Math.floor(Math.random() * monstros.length)];
        exibirMonstros([aleatorio]);
    }
});

btnFiltrar.addEventListener('click', async () => {
    const monstros = await carregarMonstros();
    const filtrados = filtrarMonstros(monstros);
    exibirMonstros(filtrados);
});

window.addEventListener('load', async () => {
    const monstros = await carregarMonstros();
    exibirMonstros(monstros);
});
