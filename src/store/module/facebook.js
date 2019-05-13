import {
  getFbSplidersClassifys,
  createFaceBookSpliders,
  getFaceBookSpliders,
  getFaceBookVideos,
  deleteFaceBookSpiders,
  updateFaceBookSpliders
} from "../../api/facebook";

const facebook = {
  state: {},
  mutations: {},
  actions: {
    GetFaceBookSpliders({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        getFaceBookSpliders(res)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    GetFbSplidersClassifys() {
      return new Promise(async (resolve, reject) => {
        getFbSplidersClassifys()
          .then(data => {
            resolve(data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    CreateFaceBookSpliders({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        createFaceBookSpliders(res)
          .then(data => {
            resolve(data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    GetFaceBookVideos({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        getFaceBookVideos(res)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    DeleteFaceBookSpiders({ commit }, id) {
      return new Promise(async (resolve, reject) => {
        deleteFaceBookSpiders(id)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    UpdateFaceBookSpliders({ commit }, { res, id }) {
      return new Promise(async (resolve, reject) => {
        updateFaceBookSpliders({ res, id })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default facebook;
