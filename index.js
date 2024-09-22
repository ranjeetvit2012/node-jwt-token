const express = require('express')
const app = express()
const port = 4444
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/generate-token', (req, res) => {
   try{
    const payload = {
        data:{
          name:"ranjeet"
        },
      };
    
      const jwk = {
        kty: 'RSA',
        n: 'n0OvCPZN_Hy7h1uCjf1sMSD0Rg54O7czPpIh7Csc5aqU6EfAgO1xCsLKZm-8ilFUjvkua3kkHsVZ-8P-fIcE_8_ZQ19ITWE63H0wqp2FUI2UlsdY1z7TsuMeNjDeN8bh_6qaWVJx6O3Wll_OmnQj5VZLIYJpB77Vyzp-9G4oCrJRbjHXpB-2CH7zQQ38x5IBfJ4MvVrhxPC76YhVnumqXbrGnr4tso37S-kpdyygIDUYQa4sBqwbRHlu2xNImornVcqAua9JF0gOF9cicd99wvN3t0dCZUwE44v-jwMXPVcqZrvrezGipCSkNfB6O-4s6TQrztVy1CN5PHML6f5F3w',
        e: 'AQAB',
        d: 'QNXFclEOw2wlzX834UTbIA7p0oE-ehTk9CJ6U9HjRC3Sy9K17-Z5f-d3jQcMyoQ8d63CM3dP-ITf0mnh9mDi7J75M_-ch_--fhcq0jIpHPdeF5mUtZ96gBcMbAQt2qgIxdN2XUl-XNRB6Nqc2WzRViHwmPYlesU59K9eEnSrsVps6qlMGx7ywrbo57V8cVUo5w72IT-WKCGuWDrQNDWtDR9nRUpZnQCHXgdqNqjEvqBUM4VilOkQ7izz9k3a_CvnNlbtG6EbiHKgOC980XEnVZvMz0al_JQrOdPi_wWM7k_Ell3JslXVRsebaUuGq0jRM9Aeq4iczfuPKKY3ZZMN6Q',
        p: 'z9B8-78d513DKvF5SxsL5wpw-BraiFjXPZqJ_0eGQ8jTEXJ9vRZkpp-Rjp-XF0RD9O2en2_3d8LX3CZk_WI8ehjwdne4iHACCxWi-I_xlbP_m6K8RrzRkn5TosEDF9nqQgeVsEFYsHJBOXV85BCrgPs3irQs7fDML7wleGLm_qc',
        q: 'xDFZPCHZ0dYuBiDC3s_1ZxZHEpuuiGT1Fre5wAeL173vdjhyQByPiYdgykQ_SFrua1uHqIv7OokN5hjG3WVPTQ6ogSEo9XYIg2pzaB-oHJ_LKCgQqw4Cpn-T3KNRvIATSHLucXU39V6vfWCZWrfCzbza-n0KtJS7axoqiwhyXgk',
        dp: 'fVQbTCgCfNpLLcbbg7QYBYqCft6TFM-fX4On3dDg5FhlEoyd0D-FDAgH3J_amymMYlY756O69vsG-7ocBcQM_QW1X3zsSTxjvxOZaZZF-CbJ7K7EJVUSfuq4vdrxZp0BbjjsyZNfTWpac7CrVU_IXs0ivf_TaNxkCBXL80KSVNk',
        dq: 'Rki_hRFDbS7jcgKOjS_G5FVQxNPM5MP2IVtUSfzqFjHO9XUnSNxyd3xuKkfku9EHlKJHqRPsvn2W4xWBOJMwo5RavVfZyoWsaxfZnDWrDgYYy5v-zKjKPkd5-xLvFy5yugOidDbgAyEWkT3n8l3ehcHgWNgu255kveuzzfcKsbE',
        qi: 'r_7fyhUbqntoTwgmvP3-gjXORPKK3o6-CRXlhoPQ9ucnFKi4Sq5EnFBRaKh183l85_3O80bticzOA2R0UL383sgIluimWrOxmJ2cVhaghp8lb5o3mEgEUQDjRHgEfnCfiEf0hBe-Kqc_idxH1STz2DdUG_os5CP69Q7Gd7etFhQ'
      }
    
    const pem = jwkToPem(jwk, { private: true });
    const token = jwt.sign({ payload }, pem, { algorithm: "RS256", expiresIn:'1h', });
     res.send(token)
   }catch(err){
    throw new Error(err)
   }
})

app.post("/verify-token",async(req,res)=>{
    try{
      try{
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            const token = req.headers.authorization.split(' ')[1];
            const jwk = {
              kty: 'RSA',
              n: 'n0OvCPZN_Hy7h1uCjf1sMSD0Rg54O7czPpIh7Csc5aqU6EfAgO1xCsLKZm-8ilFUjvkua3kkHsVZ-8P-fIcE_8_ZQ19ITWE63H0wqp2FUI2UlsdY1z7TsuMeNjDeN8bh_6qaWVJx6O3Wll_OmnQj5VZLIYJpB77Vyzp-9G4oCrJRbjHXpB-2CH7zQQ38x5IBfJ4MvVrhxPC76YhVnumqXbrGnr4tso37S-kpdyygIDUYQa4sBqwbRHlu2xNImornVcqAua9JF0gOF9cicd99wvN3t0dCZUwE44v-jwMXPVcqZrvrezGipCSkNfB6O-4s6TQrztVy1CN5PHML6f5F3w',
              e: 'AQAB'
            }
          const pem = jwkToPem(jwk);
          let decoded = jwt.verify(token, pem, { algorithms: ['RS256'] });
          res.send(decoded);
    
        }else{
            const tokemError={message:"token is empty",status:401};
            
            next(tokemError);
            //res.send(tokemError)
        }
        }catch(err){
            next(err)
        }
       
        
      
    }catch(err){
        throw new Error(err)
    }
  
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})