const NodeCache=require('node-cache');
const myCache=new NodeCache();

//create cache
const cache=duration=>(req, res, next)=>{
    if(req.method !== 'GET'){
        console.error('Can\'t catche on this method');
        return next();
    }

    //check key exist in cache
    const key=req.originalUrl;
    const cacheResponse=myCache.get(key);
    //if exist send cache result
    if(cacheResponse){
        console.log(`Cache hit for ${key}`);
        return res.send(cacheResponse);
    }else{
        console.log(`Cache miss for ${key}`);
        res.originalSend=res.send;
        res.send=body=>{
            res.originalSend(body);
            myCache.set(key, body, duration);
        }
    }
    next();
}
//delete cache
const delcache=key=>(req, res, next)=>{
    myCache.del(key);
    next();
}
module.exports={
    cache,
    delcache
}