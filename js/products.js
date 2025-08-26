// Fil: products.js

const products = [
    {
        id: 'prod_001',
        ecwidId: '777515903',
        name: 'Karabin krok',
        price: '5.00',
        image: 'Bilder/kar2.png',
        description: 'En solid karabinkrok i stål. Perfekt for nøkler eller utstyr.'
    },
    {
        id: 'prod_002',
        ecwidId: '777573842',
        name: 'Vaske Sett',
        price: '80',
        image: 'Bilder/vaskesett.png',
        description: 'Et vaskesett som er perfekt til rengjøring'
    }, // <-- DU MANGLER ET KOMMA HER. JEG HAR LAGT DET TIL.
    {
        id: 'prod_003',
        ecwidId: '777591031',
        name: 'Egge Form',
        price: '80',
        image: 'Bilder/eggeform.png',
        description: 'Til å forme eggene dine'
    } // It's good practice to have a comma here too, but it's not required for the last item.

];
