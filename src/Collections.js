import Collection from './Collection';
import Item from './Item';
import Ajax from './Ajax';
import _ from 'lodash';


export default class Collections {
	constructor(root) {
		this.root = root;
		this.ajax = new Ajax();
	}


	getPublicCollections() {
		return this._request("/collections").then(function (data) {
			if (_.isArray(data)) {
				return _.map(data, function (item) {
					return new Collection(item.id, item.name);
				})
			}

			return [];
		});
	}


	getCollectionItems(collectionId) {
		return this._request('/items/collection/' + collectionId).then(function (data) {
			return _.map(data, function (item) {
				return new Item(item.id, item.item_name, item.desc);
			})
		})
	}


	_request(path) {
		return this.ajax.request(this.root + path).then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		});
	}
}
