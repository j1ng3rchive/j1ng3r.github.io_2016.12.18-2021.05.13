(new AI)
    .defineGeneCount(100)
    .defineIterations(300)
    .defineCostFunction(function(...a){
        var o={},i;
        for(i in a)
            o[args[i]]=a[i];
        return Cost(Simulate(o));
    },args)
    .defineReproduction("linear",5)
    .defineCompletionFunction(function(genes){
        var gene,i,j;
        Q=Object.deepCopy(genes);
        for(i in genes){
            gene=genes[i];
            for(j in gene.data)
                gene.data[j]+="";
        }
        console.log(q=genes);
    })
    .defineGeneProperties({
        makeNewProb:0.01,
        mutProb:0.4,
        resetProb:0.1
    },{
        "voltage":{
            minVal:1.48,
            maxValSoft:10,
            maxMut:0.1,
            returnFunc:_=>math.unit(_,"V")
        },
        "plate_dist":{
            minValSoft:-5,
            maxValSoft:5,
            maxMut:0.5,
            returnFunc:_=>math.unit(Math.exp(_),"mm")
        },
        "plate_width":{
            minValSoft:-5,
            maxValSoft:5,
            maxMut:0.5,
            returnFunc:_=>math.unit(Math.exp(_),"mm")
        },
        "plate_length":{
            minValSoft:1,
            maxValSoft:11,
            maxMut:0.5,
            returnFunc:_=>math.unit(Math.exp(_),"mm")
        },
        "plate_height":{
            minValSoft:-1,
            maxValSoft:9,
            maxMut:0.5,
            returnFunc:_=>math.unit(Math.exp(_),"mm")
        },
        "plate_material":{
            array:Object.keys(K.MAT)
        },
        "number_of_plates":{
            array:[2]
        },
        "electrolyte_name":{
            array:["Na2CO3"]
        },
        "electrolyte_weight":{
            minValSoft:-2,
            maxValSoft:3,
            maxMut:0.3,
            returnFunc:_=>math.unit(Math.exp(_),"g")
        },
        "temperature":{
            minVal:50,
            maxVal:180,
            maxMut:10,
            returnFunc:_=>math.eval(_+"degF to K")
        },
        "water_weight":{
            minValSoft:3,
            maxValSoft:13,
            maxMut:0.5,
            returnFunc:_=>math.unit(Math.exp(_),"g")
        }
    })/*
        maxValSoft:10,
        minValSoft:-10,
        maxMut:0.1,
        returnFunc:_=>_
    })*/
    .execute()
;
