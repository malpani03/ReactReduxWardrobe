import {takeLatest,all,call} from 'redux-saga/effects'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import{fetchCa}
export const fetchCategoriesStartAsync = () => {
    return async (dispatch) => {
      dispatch(fetchCategoriesStart());
      try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray));
      } catch (error) {
        dispatch(fetchCategoriesFailure(error));
      }
    };