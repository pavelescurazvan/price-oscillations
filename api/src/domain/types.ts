import {Repository} from "./repository";

export type Transaction = {
  date: string,
}

export type Result = {
  data: number,
}

export type DependencyOne = ({ transaction }: {
  transaction: Transaction,
}) => Promise<Result>

export type CreateDependencyOne = ({ repository }: {
  repository: Repository
}) => {
  dependencyOne: DependencyOne
}
