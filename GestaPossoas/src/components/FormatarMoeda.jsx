export default function FormatarMoeda(props){

    return new Intl.NumberFormat('pt-AO', {
        style: 'currency',
        currency: 'AOA',
    }).format(props.valor).replace(/\sKz$/, 'Kz');

}