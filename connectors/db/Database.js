const {v4: uuidv4} = require("uuid");
const {firestore} = require("firebase-admin");
const {Timestamp} = firestore;

class Database {
  constructor(colllectionName) {
    this.db = firestore();
    this.colllectionName = colllectionName;
  }

  _getCollection() {
    return this.db.collection(this.colllectionName);
  }

  getIdFromDoc(doc) {
    const id = String(doc.ref.path).split("/");
    return id[id.length-1];
  }

  attachIdFromDocs(docs) {
    return (docs || []).map((doc) => {
      return Object.assign({_id: this.getIdFromDoc(doc)}, doc.data());
    });
  }

  async findAll() {
    const ref = this._getCollection();
    const res = await ref.get();
    return {
      count: res.size,
      data: this.attachIdFromDocs(res.docs),
    };
  }

  async findById(docId) {
    const ref = this._getCollection().doc(docId);
    const doc = await ref.get();
    if (!doc.exists) return null;
    return this.attachIdFromDocs([doc])[0];
  }

  async insert(payload = {}) {
    const nowDate = new Date();
    const newDocId = uuidv4();
    payload._id = newDocId;
    payload.time_created_at = Timestamp.fromDate(nowDate);
    const ref = this._getCollection().doc(newDocId);
    await ref.set(payload, {merge: true});
    payload.time_created_at = nowDate.toISOString();
    return payload;
  }

  async updateById(docId, payload = {}) {
    const nowDate = new Date();
    payload._id = docId;
    payload.time_updated_at = Timestamp.fromDate(nowDate);
    const ref = this._getCollection().doc(docId);
    await ref.set(payload, {merge: true});
    payload.time_updated_at = nowDate.toISOString();
    return docId;
  }

  async deleteBy(docId) {
    const ref = this._getCollection().doc(docId);
    await ref.delete;
    return docId;
  }
}

module.exports = Database;
