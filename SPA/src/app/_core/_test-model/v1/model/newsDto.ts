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


export interface NewsDto { 
    news_ID?: number | null;
    title?: string | null;
    short_Description?: string | null;
    contents?: string | null;
    update_By?: string | null;
    update_Time?: string | null;
    image?: string | null;
    urlImages?: Array<string> | null;
    file?: Array<Blob> | null;
}

