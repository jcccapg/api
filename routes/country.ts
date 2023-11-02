import express, { NextFunction, Request, Response } from "express";
import InfoAPI from "../services/API/InfoAPI";
import NewsAPI from "../services/API/NewsAPI";
import WeatherAPI from "../services/API/WeatherAPI";
import IValidator from "../services/validators/IValidator";
import ValidatorInfoParamsImpl from "../services/validators/ValidatorInfoParamsImpl";
import ValidatorWeatherParamsImpl from "../services/validators/ValidatorWeatherParamsImpl";
import ValidatorNewsParamsImpl from "../services/validators/ValidatorNewsParamsImpl";
import { InfoRequestData, NewsRequestData, WeatherRequestData } from "../type/RequestData";

const router = express.Router();

function middlewareInfoParamCheck(req: Request, res: Response, next : NextFunction){
    const name : any = req.query.name

    const validator : IValidator<InfoRequestData> = new ValidatorInfoParamsImpl();
    if(!validator.validar({name})){
        res.send({});
        return
    }
    next();
}

function middlewareNewsParamCheck(req: Request, res: Response, next : NextFunction){
    const country : any = req.query.name
    const validator : IValidator<NewsRequestData> = new ValidatorNewsParamsImpl();
    if(!validator.validar({name: country})){
        res.send({});
        return;
    }
    next();
}

function middlewareWeatherParamCheck(req: Request, res: Response, next: NextFunction){
    const latitude : any = req.query.lat;
    const long : any = req.query.long

    const validator : IValidator<WeatherRequestData> = new ValidatorWeatherParamsImpl();
    if(!validator.validar({lat: latitude, lon: long})){
        res.send({});
        return;
    }
    next();
}

router.get("/info", middlewareInfoParamCheck, async (req: Request, res: Response) => {
    const name : any = req.query.name;
    const infoAPI : InfoAPI = new InfoAPI();
    res.send( await infoAPI.getCountryInfoByName({name}));
});

router.get("/news", middlewareNewsParamCheck, async (req: Request, res: Response) => {
    const name : any = req.query.name;

    const newsAPI : NewsAPI = new NewsAPI();
    res.send(await newsAPI.getCountryNewsByName({name}));    
});

router.get("/weather", middlewareWeatherParamCheck, async (req: Request, res: Response,) => {
    const latitude : any = req.query.lat;
    const long : any = req.query.long

    const weatherAPI : WeatherAPI = new WeatherAPI();
    res.send(await weatherAPI.getCountryWeatherByGeo({ lon: long, lat: latitude}));
});

export default router;