/**
 * GHF_API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent, HttpParameterCodec, HttpContext
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

// @ts-ignore
import { NewsDto } from '../model/newsDto';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';



@Injectable({
    providedIn: 'root'
})
export class NewsService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string | string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                    throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param newsDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiNewsCreatePost(newsDto?: NewsDto, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any>;
    public apiNewsCreatePost(newsDto?: NewsDto, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpResponse<any>>;
    public apiNewsCreatePost(newsDto?: NewsDto, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpEvent<any>>;
    public apiNewsCreatePost(newsDto?: NewsDto, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (Bearer) required
        localVarCredential = this.configuration.lookupCredential('Bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/News/create`;
        return this.httpClient.request<any>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: newsDto,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param newsID 
     * @param title 
     * @param shortDescription 
     * @param contents 
     * @param updateBy 
     * @param updateTime 
     * @param image 
     * @param urlImages 
     * @param file 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiNewsDeleteDelete(newsID?: number, title?: string, shortDescription?: string, contents?: string, updateBy?: string, updateTime?: string, image?: string, urlImages?: Array<string>, file?: Array<Blob>, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any>;
    public apiNewsDeleteDelete(newsID?: number, title?: string, shortDescription?: string, contents?: string, updateBy?: string, updateTime?: string, image?: string, urlImages?: Array<string>, file?: Array<Blob>, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpResponse<any>>;
    public apiNewsDeleteDelete(newsID?: number, title?: string, shortDescription?: string, contents?: string, updateBy?: string, updateTime?: string, image?: string, urlImages?: Array<string>, file?: Array<Blob>, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpEvent<any>>;
    public apiNewsDeleteDelete(newsID?: number, title?: string, shortDescription?: string, contents?: string, updateBy?: string, updateTime?: string, image?: string, urlImages?: Array<string>, file?: Array<Blob>, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any> {

        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (newsID !== undefined && newsID !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>newsID, 'News_ID');
        }
        if (title !== undefined && title !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>title, 'Title');
        }
        if (shortDescription !== undefined && shortDescription !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>shortDescription, 'Short_Description');
        }
        if (contents !== undefined && contents !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>contents, 'Contents');
        }
        if (updateBy !== undefined && updateBy !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>updateBy, 'Update_By');
        }
        if (updateTime !== undefined && updateTime !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>updateTime, 'Update_Time');
        }
        if (image !== undefined && image !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>image, 'Image');
        }
        if (urlImages) {
            urlImages.forEach((element) => {
                localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                    <any>element, 'UrlImages');
            })
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (Bearer) required
        localVarCredential = this.configuration.lookupCredential('Bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let localVarFormParams: { append(param: string, value: any): any; };
        let localVarUseForm = false;
        let localVarConvertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        localVarUseForm = canConsumeForm;
        if (localVarUseForm) {
            localVarFormParams = new FormData();
        } else {
            localVarFormParams = new HttpParams({ encoder: this.encoder });
        }

        if (file) {
            file.forEach((element) => {
                localVarFormParams = localVarFormParams.append('File', <any>element) as any || localVarFormParams;
            })
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/News/delete`;
        return this.httpClient.request<any>('delete', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: localVarConvertFormParamsToString ? localVarFormParams.toString() : localVarFormParams,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param text 
     * @param pageNumber 
     * @param pageSize 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiNewsGetallGet(text?: string, pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any>;
    public apiNewsGetallGet(text?: string, pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpResponse<any>>;
    public apiNewsGetallGet(text?: string, pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpEvent<any>>;
    public apiNewsGetallGet(text?: string, pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any> {

        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (text !== undefined && text !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>text, 'text');
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>pageNumber, 'PageNumber');
        }
        if (pageSize !== undefined && pageSize !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>pageSize, 'PageSize');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (Bearer) required
        localVarCredential = this.configuration.lookupCredential('Bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/News/getall`;
        return this.httpClient.request<any>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param newsId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiNewsGetnewsbyidGet(newsId?: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any>;
    public apiNewsGetnewsbyidGet(newsId?: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpResponse<any>>;
    public apiNewsGetnewsbyidGet(newsId?: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpEvent<any>>;
    public apiNewsGetnewsbyidGet(newsId?: number, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any> {

        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (newsId !== undefined && newsId !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
                <any>newsId, 'news_id');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (Bearer) required
        localVarCredential = this.configuration.lookupCredential('Bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/News/getnewsbyid`;
        return this.httpClient.request<any>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param newsDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiNewsUpdatePut(newsDto?: NewsDto, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any>;
    public apiNewsUpdatePut(newsDto?: NewsDto, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpResponse<any>>;
    public apiNewsUpdatePut(newsDto?: NewsDto, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<HttpEvent<any>>;
    public apiNewsUpdatePut(newsDto?: NewsDto, observe: any = 'body', reportProgress: boolean = false, options?: { httpHeaderAccept?: undefined, context?: HttpContext }): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (Bearer) required
        localVarCredential = this.configuration.lookupCredential('Bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/News/update`;
        return this.httpClient.request<any>('put', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: newsDto,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}