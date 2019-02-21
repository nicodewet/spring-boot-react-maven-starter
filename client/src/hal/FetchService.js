import FetchUtil from './FetchUtil';
import ValidationError from './ValidationError';

const HAL_API_ROOT = '/api';
const HAL_FETCH_HEADERS = {
  headers: { 'Content-Type': 'application/hal+json' }
};
const HAL_PAGE_SIZE = 2;

export default class FetchService {
  static async getEmployeesFromHalApi() {
    let halRootDocumentData = await FetchUtil.asyncFetch(
      HAL_API_ROOT,
      HAL_FETCH_HEADERS
    );

    console.log(halRootDocumentData);

    if (
      halRootDocumentData._links !== undefined &&
      halRootDocumentData._links['employees'] !== undefined
    ) {
      let employeesContainedLinkHref =
        halRootDocumentData._links['employees'].href;

      let res = employeesContainedLinkHref.split('{?page,size,sort}');
      let employeesLink = res[0];

      let pagedEmployeesUrl = employeesLink + '?size=' + HAL_PAGE_SIZE;

      let pagedEmployeeResponseData = await FetchUtil.asyncFetch(
        pagedEmployeesUrl,
        HAL_FETCH_HEADERS
      );

      console.log(pagedEmployeeResponseData);

      //if (pagedEmployeeResponseData.page !== undefined) {
      // this can be used for validation and user feedback and driving logic:
      // {size: 2, totalElements: 5, totalPages: 3, number: 0}
      // the _links can be saved for fetching we need to
      //}

      return pagedEmployeeResponseData._embedded.employees;
    } else {
      throw new ValidationError(
        'HAL API root object may not be a Resource Object as it has no _links or contained employee resource links.'
      );
    }
  }
}
