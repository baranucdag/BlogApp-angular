import { ResponseModel } from './responseModel';

export interface ListResponsModel<T> extends ResponseModel {
  data: T[];
}
