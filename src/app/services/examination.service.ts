import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { ResponseModel } from '../models/responses/responseModel';
import { Examination } from '../models/entities/examination';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  apiUrl = "https://localhost:44328/api/"

  constructor(private httpClient:HttpClient) { }

  getExaminations(): Observable<ListResponseModel<Examination>> {
    let newPath = this.apiUrl + "examination/getall"
    return this.httpClient.get<ListResponseModel<Examination>>(newPath);
  }

  getByExaminationId(examinationId: number): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "examination/getbyexaminationid?examinationid=" + examinationId
    return this.httpClient.get<SingleResponseModel<number>>(newPath)
  }

  getByPetId(petId: number): Observable<ListResponseModel<number>> {
    let newPath = this.apiUrl + "examination/getbypetid?petid=" + petId
    return this.httpClient.get<ListResponseModel<number>>(newPath)
  }

  getByPetOwnerId(ownerId: number): Observable<ListResponseModel<number>> {
    let newPath = this.apiUrl + "examination/getbypetownerid?ownerid=" + ownerId
    return this.httpClient.get<ListResponseModel<number>>(newPath)
  }

  getByVetId(vetId: number): Observable<ListResponseModel<number>> {
    let newPath = this.apiUrl + "examination/getbyvetid?vetid=" + vetId
    return this.httpClient.get<ListResponseModel<number>>(newPath)
  }

  add(examination: Examination): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + "examination/add"
    return this.httpClient.post<SingleResponseModel<number>>(newPath, examination)
  }

  delete(examination: Examination): Observable<ResponseModel> {
    let newPath = this.apiUrl + "examination/delete"
    return this.httpClient.post<ResponseModel>(newPath, examination)
  }

  update(examination: Examination): Observable<ResponseModel> {
    let newPath = this.apiUrl + "examination/update"
    return this.httpClient.post<ResponseModel>(newPath, examination)
  }
}
