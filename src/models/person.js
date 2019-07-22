let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const personSchema = Schema({
  person_id: {type: String, unique: true, required: true},
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}).plugin(mongoosePaginate);


function filterByID(obj) {
  if ('id' in obj && typeof(obj.id)) {
    return true;
  } 
}


var Person = mongoose.model('Person', personSchema);

module.exports = Person;


function log(data) {
    console.log(JSON.stringify(data, undefined, 2))
  }
module.exports.bulk =  (async function (array) { 


try {
    const docs = await Person.insertMany(array, {ordered: false});
    return Promise.resolve(docs);
} catch (e) {
       if (e.code === 11000){
            // 1- getting duplicates
            console.log('getting duplicates');

            let orders = [];
            const ordersIDs = e.result.result.writeErrors.map(error=>{
                const parsedError = JSON.stringify(error);
                const order = JSON.parse(parsedError).op;
                orders.push(order);
                return order.person_id;
            });
            console.log("ordersIDs>>",ordersIDs)
            // 2- removing old duplicates.
            const deleted = await Person.deleteMany({person_id:{'$in':ordersIDs}});

            //console.log("deleted",deleted)
            //console.log(deleted.result.nModified + " document(s) updated");
          
            // 3- adding the orders
            try{

                const newAddedOrders = await Person.insertMany(orders , {ordered : false});
                return Promise.resolve(newAddedOrders);
            }catch (e) {
                return Promise.reject(e);
            }
             

        }else return Promise.reject(e);

}
return "suceess"
});

  /*
module.exports.bulk = (async function (docs) {
  try {


    let results = await new Promise((resolve, reject) => {
      Person.collection.insertMany(docs, { ordered: false }, (err,result) => {
            if (err) {
              
              if ("name" in err && err.name == 'BulkWriteError') {
              var wErrors = wErrors = err.writeErrors;
                 //console.log("wErrors>>>",wErrors);
                 if (typeof wErrors !== 'undefined' && wErrors !== null){
                   var persons = [];
                   wErrors.forEach(function (ops) {
            
                     persons.push(ops.err.op);
              
                   });
                   console.log("persons.id>>>>",persons.id)
                   Person.updateMany({ "person_id": persons.id }, persons,{}, (err, result)=>{
                     if(err){
                        console.log(err)
                     }

                     if(result) {
                       console.log(resolve)
                     }


                   });
                   resolve(persons);
                 }else{
                   var doc = err.op;
                    console.log("doc >>>",doc);
                   resolve({"doc":doc});
                 }
              
              }else {

                reject(err);
              }
            
            };   
            resolve(result);
          }
        )
    });
//console.log("Resuls >>>>>>>>>> ",results);
return results;
  } catch (e) {
      console.dir(e);
      console.log(e);
      console.log(JSON.stringify(e.writeErrors,undefined,2));
  }
});
*/
