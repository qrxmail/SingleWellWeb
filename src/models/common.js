import { getOilStation, getDriver, getTruck } from '@/services/common';

const CommonModel = {
    namespace: 'common',
    state: {
        oilStationData: [],
        driverData: [],
        truckData: [],
    },

    effects: {
        *fetchOilStationData(_, { call, put }) {
            const response = yield call(getOilStation);
            yield put({
                type: 'saveReducerOilStationData',
                payload: response,
            });
        },
        *fetchDriverData(_, { call, put }) {
            const response = yield call(getDriver);
            yield put({
                type: 'saveReducerDriverData',
                payload: response,
            });
        },
        *fetchTruckData(_, { call, put }) {
            const response = yield call(getTruck);
            yield put({
                type: 'saveReducerTruckData',
                payload: response,
            });
        },
    },

    reducers: {
        saveReducerOilStationData(state, action) {
            return {
                ...state,
                oilStationData: action.payload || []
            };
        },
        saveReducerDriverData(state, action) {
            return {
                ...state,
                driverData: action.payload || []
            };
        },
        saveReducerTruckData(state, action) {
            return {
                ...state,
                truckData: action.payload || []
            };
        },
    },
};
export default CommonModel;
