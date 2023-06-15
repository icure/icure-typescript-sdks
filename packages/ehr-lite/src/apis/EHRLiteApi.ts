import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";
import {
    IccAccesslogXApi,
    IccAuthApi,
    IccCalendarItemXApi,
    IccClassificationXApi,
    IccCodeXApi,
    IccContactXApi,
    IccCryptoXApi,
    IccDeviceApi,
    IccDocumentXApi,
    IccEntityrefApi,
    IccFormXApi,
    IccGroupApi,
    IccHcpartyXApi,
    IccHelementXApi,
    IccInsuranceApi,
    IccInvoiceXApi,
    IccMessageXApi,
    IccPatientXApi,
    IccReceiptXApi,
    IccTimeTableXApi,
    IccUserXApi
} from "@icure/api";

class EHRLiteApi {

    constructor(
        private readonly _baseApi: {
            cryptoApi: IccCryptoXApi
            authApi: IccAuthApi
            userApi: IccUserXApi
            codeApi: IccCodeXApi
            patientApi: IccPatientXApi
            healthcarePartyApi: IccHcpartyXApi
            accessLogApi: IccAccesslogXApi
            contactApi: IccContactXApi
            healthcareElementApi: IccHelementXApi
            deviceApi: IccDeviceApi
            documentApi: IccDocumentXApi
            formApi: IccFormXApi
            invoiceApi: IccInvoiceXApi
            insuranceApi: IccInsuranceApi
            messageApi: IccMessageXApi
            entityReferenceApi: IccEntityrefApi
            receiptApi: IccReceiptXApi
            calendarItemApi: IccCalendarItemXApi
            classificationApi: IccClassificationXApi
            timetableApi: IccTimeTableXApi
            groupApi: IccGroupApi
            maintenanceTaskApi: IccMaintenanceTaskXApi
            dataOwnerApi: IccDataOwnerXApi
        }
    ) {
    }
}