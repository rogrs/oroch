function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}


// example usage

const pets = [
    {pis:"1234", name:"Rogerio", date: "01/07/2019", clocking:"08:12:00"},
    {pis:"1234", name:"Rogerio", date: "01/07/2019", clocking:"12:12:00"},
    {pis:"1234", name:"Rogerio", date: "01/07/2019", clocking:"13:12:00"},
    {pis:"1234", name:"Rogerio", date: "01/07/2019", clocking:"17:00:00"},
    {pis:"1234", name:"Rogerio", date: "03/07/2019", clocking:"08:00:00"},
    {pis:"1234", name:"Rogerio", date: "03/07/2019", clocking:"17:00:00"},
    {pis:"5267", name:"Mauro", date: "01/07/2019", clocking:"09:00:00"},
    {pis:"5267", name:"Mauro", date: "01/07/2019", clocking:"18:00:00"},
    {pis:"5267", name:"Mauro", date: "05/07/2019", clocking:"09:00:00"},
    {pis:"5267", name:"Mauro", date: "05/07/2019", clocking:"19:00:00"}
];
    
//const grouped = groupBy(pets, pet => pet.date);
//console.log(grouped); 



//var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
    result = pets.reduce(function (r, a) {
        r[a.pis] = r[a.pis] || [];
        r[a.pis].push(a);
        return r;
    }, Object.create(null));


console.log(result);
