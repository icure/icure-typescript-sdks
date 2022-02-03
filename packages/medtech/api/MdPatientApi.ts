/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { XHR } from "./XHR"
import { Filter } from '../model/Filter';
import { PaginatedListPatient } from '../model/PaginatedListPatient';
import { Patient } from '../model/Patient';


export class MdPatientApi {
  host: string
  headers: Array<XHR.Header>
  fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>

  constructor(host: string, headers: any, fetchImpl?: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
    this.fetchImpl = fetchImpl
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.XHRError): never {
    throw e
  }


     /**
      * 
      * @summary Create or update a Patient
      * @param body 
      */
 createOrModifyPatient(body?: Patient): Promise<Patient> {
    let _body = null
    _body = body

    const _url = this.host + `/patient` + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/xml"))
    return XHR.sendCommand("PUT", _url, headers, _body, this.fetchImpl)
      .then(doc => 
          
              new Patient(doc.body as JSON)
              
      )
      .catch(err => this.handleError(err))
}

     /**
      * 
      * @summary Delete a Patient
      * @param id 
      */
 deletePatient(id: string): Promise<string> {
    let _body = null
    
    const _url = this.host + `/patient/${encodeURIComponent(String(id))}` + "?ts=" + new Date().getTime() 
    let headers = this.headers
    return XHR.sendCommand("DELETE", _url, headers, _body, this.fetchImpl)
      .then(doc => 
          
              JSON.parse(JSON.stringify(doc.body))
              
      )
      .catch(err => this.handleError(err))
}

     /**
      * 
      * @summary Find Patients using a filter
      * @param body 
      */
 filterPatients(body?: Filter): Promise<PaginatedListPatient> {
    let _body = null
    _body = body

    const _url = this.host + `/patient/filter` + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/xml"))
    return XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => 
          
              new PaginatedListPatient(doc.body as JSON)
              
      )
      .catch(err => this.handleError(err))
}

     /**
      * 
      * @summary Get a Patient
      * @param id 
      */
 getPatient(id: string): Promise<Patient> {
    let _body = null
    
    const _url = this.host + `/patient/${encodeURIComponent(String(id))}` + "?ts=" + new Date().getTime() 
    let headers = this.headers
    return XHR.sendCommand("GET", _url, headers, _body, this.fetchImpl)
      .then(doc => 
          
              new Patient(doc.body as JSON)
              
      )
      .catch(err => this.handleError(err))
}

     /**
      * 
      * @summary Find Patients using a filter
      * @param body 
      */
 matchPatients(body?: Filter): Promise<Array<string>> {
    let _body = null
    _body = body

    const _url = this.host + `/patient/match` + "?ts=" + new Date().getTime() 
    let headers = this.headers
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/json"))
    headers = headers.filter(h => h.header !== "Content-Type").concat(new XHR.Header("Content-Type", "application/xml"))
    return XHR.sendCommand("POST", _url, headers, _body, this.fetchImpl)
      .then(doc => 
          
              (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it)))
      )
      .catch(err => this.handleError(err))
}
}

