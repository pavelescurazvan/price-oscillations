import {RequestHandler} from "express";
import {DependencyOne} from "../domain";

/**
 * Creates the transaction request handler
 * @param repository
 */
export const createListCurrenciesRequestHandler = ({ dependencyOne }: {
  dependencyOne: DependencyOne
}): RequestHandler  => {

  return async (req, res) => {
    const {data} = req.body;

    console.log(dependencyOne);
    console.log(data);

    res.send({});
  }

}
