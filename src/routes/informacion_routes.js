const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
//const Info = require('../model/info_model');
const departamento = '';
const edad = '';
const sexo = '';

router.get('/', async (req, res) => {
    
    if(!departamento){
        await fetch(`https://www.datos.gov.co/resource/mkw6-468s.json?$$app_token=jGSqtfJ9FneXmBbZTxSEtcjjC&`)
        .then((respuesta)=>{
            return respuesta.json();
   
        })
        .then((respuesta)=>{
            res.json(respuesta)
        })
    }else{
        await fetch(`https://www.datos.gov.co/resource/mkw6-468s.json?$$app_token=jGSqtfJ9FneXmBbZTxSEtcjjC&departamento=${departamento}&edad=${edad}&sexo=${sexo}`)
        .then((respuesta)=>{
            return respuesta.json();
   
        })
        .then((respuesta)=>{
            res.json(respuesta)
        })

    }
   
    
});
router.post('/', (req,res)=>{
    const { departamento,edad, sexo} = req.body;
    let dep = departamento.toUpperCase()
    fetch(`https://www.datos.gov.co/resource/mkw6-468s.json?$$app_token=jGSqtfJ9FneXmBbZTxSEtcjjC&departamento=${dep}&edad=${edad}&sexo=${sexo}`)
    .then((respuesta)=>{
        return respuesta.json();

    })
    .then((respuesta)=>{
        res.json(respuesta)
    })

})
router.post('/:id', (req, res)=>{
    const departamento = req.params.id;
    let dep = departamento.toUpperCase()
   fetch(`https://www.datos.gov.co/resource/mkw6-468s.json?$$app_token=jGSqtfJ9FneXmBbZTxSEtcjjC&$select=arma_empleada,COUNT(arma_empleada)&$where=departamento="${dep}"&$group=arma_empleada`)
    .then((respuesta)=>{
        return respuesta.json();

    })
    .then((respuesta)=>{
        res.json(respuesta)
        console.log(respuesta)
    })
})


module.exports = router;